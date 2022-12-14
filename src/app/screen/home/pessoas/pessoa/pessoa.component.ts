import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { debounceTime, firstValueFrom, map, Subscription } from 'rxjs';
import { Pessoa } from 'src/app/models/pessoa';
import { PessoaService } from 'src/app/services/pessoa.service';
import { Contato } from 'src/app/models/contato';
import { DOCUMENT } from '@angular/common';
import { ArquivoService } from 'src/app/services/arquivo.service';
import { Validação } from 'src/app/models/validacao';
import { ListaGenericaService } from 'src/app/services/lista-generica.service';
import { validador } from 'src/app/utils/validadores';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.scss'],
  providers: [ConfirmationService],
})
export class PessoaComponent implements OnInit {
  constructor(
    private pessoaService: PessoaService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private arquivoService: ArquivoService,
    private confirmationService: ConfirmationService,
    @Inject(DOCUMENT) private document: Document,
    private listaGenericaService: ListaGenericaService
  ) {}
  pessoa: Pessoa = { pessoa_juridica: false };
  pessoaOld: Pessoa = {};

  cnpj_cpfInvalido: Validação[] = [];

  emailInvalido: any = {};

  private subscription: Subscription = new Subscription();

  categorias: any = [];

  cnpjLoading: boolean = false;

  ngOnInit(): void {
    this.getCategoria();
    this.getPessoa();
  }

  getCategoria() {
    this.listaGenericaService
      .getByNameListaGenerica('categoriaContato')
      .pipe(map((listaGenerica: any) => listaGenerica.lista_generica_items))
      .subscribe({
        next: (categorias) => {
          this.categorias = categorias;
        },
      });
  }

  getPessoa() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id != 0) {
      this.subscription = this.pessoaService
        .getPessoa(id)
        .pipe(debounceTime(1000))
        .subscribe({
          next: (pessoa) => {
            if (pessoa.data_nasc)
              pessoa.data_nasc = new Date(pessoa.data_nasc!.toString());
            if (pessoa.fornecedor?.data_aprov)
              pessoa.fornecedor.data_aprov = new Date(
                pessoa.fornecedor.data_aprov.toString()
              );
            if (pessoa.fornecedor?.data_venc)
              pessoa.fornecedor.data_venc = new Date(
                pessoa.fornecedor.data_venc.toString()
              );
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

    this.pessoaService
      .addPessoa(pessoaClean)
      .pipe(debounceTime(1000))
      .subscribe({
        next: (pessoa) => {
          pessoa.data_nasc = new Date(pessoa.data_nasc!.toString());
          if (pessoa.fornecedor?.data_aprov)
            pessoa.fornecedor.data_aprov = new Date(
              pessoa.fornecedor.data_aprov.toString()
            );
          if (pessoa.fornecedor?.data_venc)
            pessoa.fornecedor.data_venc = new Date(
              pessoa.fornecedor.data_venc.toString()
            );
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
        complete: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'A pessoa foi criada.',
          });
          this.router.navigate([`/home/pessoas/${this.pessoa.id}`]);
        },
      });
  }

  updatePessoa() {
    let pessoaClean = this.cleanPessoa(this.pessoa);
    this.pessoaService
      .updatePessoa(pessoaClean)
      .pipe(debounceTime(1000))
      .subscribe({
        next: (pessoa) => {
          pessoa.data_nasc = new Date(pessoa.data_nasc!.toString());
          if (pessoa.fornecedor?.data_aprov)
            pessoa.fornecedor.data_aprov = new Date(
              pessoa.fornecedor.data_aprov.toString()
            );
          if (pessoa.fornecedor?.data_venc)
            pessoa.fornecedor.data_venc = new Date(
              pessoa.fornecedor.data_venc.toString()
            );
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
      pessoa.cnpj_cpf = pessoa.cnpj_cpf.toString().replace(/\D/g, '');
    if (pessoa.ie_rg) pessoa.ie_rg = pessoa.ie_rg.toString().replace(/\D/g, '');
    pessoa.contatos = pessoa.contatos?.map((contato: Contato) => {
      if (contato.tipo == 'Telefone' || contato.tipo == 'WhatsApp')
        contato.valor = (contato.valor||'').toString().replace(/\D/g, '');
      return contato;
    });
    return pessoa;
  }

  createOrUpdate() {
    let emailInvalido = Object.values(this.emailInvalido).filter(
      (valor) => valor === null
    );

    if (this.cnpj_cpfInvalido.length === 0 && emailInvalido.length === 0) {
      if (this.pessoa.id == undefined) {
        this.createPessoa();
      } else {
        this.updatePessoa();
      }
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Não foi possível salvar, erro de validação.',
      });
    }
  }

  deletePessoa() {
    this.pessoaService
      .deletePessoa(this.pessoa)
      .pipe(debounceTime(1000))
      .subscribe({
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
  }

  removeContato(rowIndex: number) {
    this.pessoa.contatos!.splice(rowIndex, 1);
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

  validaCpfCnpj() {
    let cnpj_cpfValidador = validador.filter(
      (validacao) => validacao.campo === 'cnpj_cpf'
    );

    let cnpj_cpfValidado = cnpj_cpfValidador.map(async (validacao) => {
      validacao.resultado = await validacao.funcao(this.pessoa);
      return validacao;
    });
    Promise.all(cnpj_cpfValidado).then((validado) => {
      let cnpj_cpfInvalido = validado.filter(
        (validacao) => validacao.resultado === false
      );
      this.cnpj_cpfInvalido = cnpj_cpfInvalido;

      if (
        cnpj_cpfInvalido.length == 0 &&
        this.pessoa.pessoa_juridica &&
        this.pessoa.cnpj_cpf
      ) {
        this.cnpjLoading = true;

        this.pessoaService
          .consultaCNPJ(this.pessoa.cnpj_cpf)
          .pipe(debounceTime(1000))
          .subscribe({
            next: (consultaPJ: any) => {
              this.pessoaOld = { ...this.pessoa };
              this.pessoa.razao_social = consultaPJ.razao_social;
              this.pessoa.nome = consultaPJ.estabelecimento.nome_fantasia
                ? consultaPJ.estabelecimento.nome_fantasia
                : consultaPJ.razao_social;
              this.pessoa.data_nasc = new Date(
                consultaPJ.estabelecimento.data_inicio_atividade
              );
              this.pessoa.endereco = `${
                consultaPJ.estabelecimento.tipo_logradouro
              } ${consultaPJ.estabelecimento.logradouro}, ${
                consultaPJ.estabelecimento.numero
              }, ${consultaPJ.estabelecimento.complemento || ''}, ${
                consultaPJ.estabelecimento.bairro
              }`;
              this.pessoa.cep = Number(consultaPJ.estabelecimento.cep);
              this.pessoa.telefone = Number(
                consultaPJ.estabelecimento.ddd1 +
                  consultaPJ.estabelecimento.telefone1
              );
              this.pessoa.email = consultaPJ.estabelecimento.email;
              this.pessoa.municipio = consultaPJ.estabelecimento.cidade.nome;
              this.pessoa.uf = consultaPJ.estabelecimento.estado.sigla;
              this.pessoa.ie_rg =
                consultaPJ.estabelecimento.inscricoes_estaduais[0].inscricao_estadual;

              this.pessoa.descricao += `Situação Cadastral: ${consultaPJ.estabelecimento.situacao_cadastral}`;
            },
            complete: () => {
              this.cnpjLoading = false;
            },
          });
      }
    });
  }

  validaEmail(email: string, campo: string) {
    let emailValidador = validador.filter(
      (validacao) => validacao.campo === 'email'
    )[0];

    this.emailInvalido[campo] = emailValidador.funcao(email);
  }

  consultaCep() {
    let cep = this.pessoa.cep?.toString().replace(/\D/g, '');

    let cepQuantosNumeros = cep?.split('').length;

    if (cepQuantosNumeros == 8 && cep) {
      this.pessoaService
        .consultaCep(cep)
        .pipe(debounceTime(1000))
        .subscribe({
          next: (cep: any) => {
            console.log(cep);
            this.pessoa.endereco = `${cep.logradouro}, ${cep.complemento}, ${cep.bairro}`;
            this.pessoa.municipio = cep.localidade;
            this.pessoa.uf = cep.uf;
          },
          error: (error: Error) => {
            console.log(error);
          },
        });
    }
  }
}
