import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Pessoa } from 'src/app/models/pessoa';
import { PessoaService } from 'src/app/services/pessoa.service';
import { Contato } from 'src/app/models/contato';
import { DOCUMENT } from '@angular/common';
import { ArquivoService } from 'src/app/services/arquivo.service';
import { Arquivo } from 'src/app/models/arquivo';
import { Validação } from 'src/app/models/validacao';
import { pessoaValidacao } from './pessoaValidacao';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.scss'],
  providers: [ConfirmationService],
})
export class PessoaComponent implements OnInit {
  pessoa: Pessoa = {pessoa_juridica: false};

  validador: Validação[] = pessoaValidacao;

  cnpj_cpfInvalido: Validação[] = [];

  private subscription: Subscription = new Subscription();

  constructor(
    private pessoaService: PessoaService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    @Inject(DOCUMENT) private document: Document,
    private arquivoService: ArquivoService
  ) {}

  ngOnInit(): void {
    this.getPessoa();
  }

  getPessoa() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id != 0) {
      this.subscription = this.pessoaService.getPessoa(id).subscribe({
        next: (pessoa) => {
          this.pessoa = pessoa;
        },
        error: (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: `${error.status} - ${error.statusText} - ${error.error}`,
          });
        },
      });
    }
  }

  createPessoa() {
    let pessoaClean = this.cleanPessoa(this.pessoa);

    this.pessoaService.addPessoa(pessoaClean).subscribe({
      next: (pessoa) => (this.pessoa = pessoa),
      error: (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: `${error.status} - ${error.statusText} - ${error.error}`,
        });
      },
      complete: () =>
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'A pessoa foi criada.',
        }),
    });
  }

  updatePessoa() {
    let pessoaClean = this.cleanPessoa(this.pessoa);

    this.pessoaService.updatePessoa(pessoaClean).subscribe({
      next: (pessoa) => (this.pessoa = pessoa),
      error: (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: `${error.status} - ${error.statusText} - ${error.error}`,
        });
      },
      complete: () =>
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'A pessoa foi atualizada.',
        }),
    });
  }

  cleanPessoa(pessoa: Pessoa) {
    if (pessoa.telefone)
      pessoa.telefone = Number(pessoa.telefone.toString().replace(/\D/g, ''));
    if (pessoa.cnpj_cpf)
      pessoa.cnpj_cpf = Number(pessoa.cnpj_cpf.toString().replace(/\D/g, ''));
    if (typeof pessoa.cnpj_cpf === 'string') delete pessoa.cnpj_cpf;
    if (pessoa.ie_rg)
      pessoa.ie_rg = Number(pessoa.ie_rg.toString().replace(/\D/g, ''));
    console.log(typeof pessoa.cnpj_cpf);
    console.log(pessoa);
    return pessoa;
  }

  createOrUpdate() {
    if (this.pessoa.id == undefined) {
      this.createPessoa();
    } else {
      this.updatePessoa();
    }
  }

  deletePessoa() {
    this.pessoaService.deletePessoa(this.pessoa).subscribe({
      next: (pessoa) => (this.pessoa = pessoa),
      error: (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: `${error.status} - ${error.statusText} - ${error.error}`,
        });
      },
      complete: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'A pessoa foi exluida.',
        });
        this.router.navigate(['/home/pessoas']);
      },
    });
  }

  newFornecedor() {
    this.pessoa.fornecedor = {};
  }

  newOperador() {
    this.pessoa.operador = {};
  }

  newVendedor() {
    this.pessoa.vendedor = {};
  }

  newContato() {
    let contatos: Contato[] = [];
    if (!this.pessoa.contatos) this.pessoa.contatos = contatos;
    this.pessoa.contatos.push({});
    console.log(this.pessoa.contatos);
  }

  removeContato(rowIndex: number) {
    this.pessoa.contatos = this.pessoa.contatos!.splice(rowIndex - 1, 1);
  }

  removeArquivo(rowIndex: number) {
    this.arquivoService
      .deleteArquivo(this.pessoa.files![rowIndex].id!)
      .subscribe({
        error: (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: `${error.status} - ${error.statusText} - ${error.error}`,
          });
        },
        complete: () => {},
      });
    this.pessoa.files = this.pessoa.files!.splice(rowIndex - 1, 1);
  }

  onFileSelected(event: Event) {
    const file: File = (event.target as HTMLInputElement).files![0];

    if (file) {
      this.arquivoService.uploadArquivo(file).subscribe({
        next: (arquivo: Arquivo) => {
          console.log(arquivo);
          this.pessoa.files?.push(arquivo);
        },
        error: (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: `${error.status} - ${error.statusText} - ${error.error}`,
          });
        },
        complete: () => {
          this.createOrUpdate();
        },
      });
    }
  }

  getBackPessoas() {
    this.router.navigate(['/home/pessoas']);
  }

  confirm() {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir este produto?',
      accept: () => {
        this.deletePessoa();
      },
    });
  }

  goToUrl(id: number): void {
    this.arquivoService.getUrlArquivo(id).subscribe({
      next: (url: any) => {
        console.log(url);
        this.document.location.href = url.url;
      },
    });
  }

  validaCpfCnpj() {
    let cnpj_cpfValidado = this.validador.map(async(validacao) => {
      validacao.resultado = await validacao.funcao();
      return validacao
    })
    Promise.all(cnpj_cpfValidado).then((validado) => {
      let cnpj_cpfInvalido = validado.filter(
        (validacao) => validacao.resultado === false
      );
      this.cnpj_cpfInvalido = cnpj_cpfInvalido;
    })
  }
}
