import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Pessoa } from 'src/app/models/pessoa';
import { Fornecedor } from 'src/app/models/fornecedor';
import { PessoaService } from 'src/app/services/pessoa.service';
import { Contato } from 'src/app/models/contato';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.scss'],
  providers: [ConfirmationService],
})
export class PessoaComponent implements OnInit {
  pessoa: Pessoa = {};

  private subscription: Subscription = new Subscription();

  constructor(
    private pessoaService: PessoaService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
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
          console.log(pessoa);
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
    let pessoaClean = this.pessoa;

    if (pessoaClean.telefone)
      pessoaClean.telefone = Number(
        pessoaClean.telefone.toString().replace(/\D/g, '')
      );
    if (pessoaClean.cnpj_cpf)
      pessoaClean.cnpj_cpf = Number(
        pessoaClean.cnpj_cpf.toString().replace(/\D/g, '')
      );
    if (pessoaClean.ie_rg)
      pessoaClean.ie_rg = Number(
        pessoaClean.ie_rg.toString().replace(/\D/g, '')
      );

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
    let pessoaClean = this.pessoa;

    if (pessoaClean.telefone)
      pessoaClean.telefone = Number(
        pessoaClean.telefone.toString().replace(/\D/g, '')
      );
    if (pessoaClean.cnpj_cpf)
      pessoaClean.cnpj_cpf = Number(
        pessoaClean.cnpj_cpf.toString().replace(/\D/g, '')
      );
    if (pessoaClean.ie_rg)
      pessoaClean.ie_rg = Number(
        pessoaClean.ie_rg.toString().replace(/\D/g, '')
      );

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
          detail: error.message,
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

  newContato(){
    let contatos: Contato[] = []
    if(!this.pessoa.contatos) this.pessoa.contatos = contatos
    this.pessoa.contatos.push({})
    console.log(this.pessoa.contatos)
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
}
