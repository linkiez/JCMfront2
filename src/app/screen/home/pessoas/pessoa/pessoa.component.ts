import { EmpresaService } from './../../../../services/empresa.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
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
import { Arquivo } from 'src/app/models/arquivo';
import { VendedorService } from 'src/app/services/vendedor.service';
import { OperadorService } from 'src/app/services/operador.service';
import { FornecedorService } from 'src/app/services/fornecedor.service';

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
    private listaGenericaService: ListaGenericaService,
    private vendedorService: VendedorService,
    private empresaService: EmpresaService,
    private operadorService: OperadorService,
    private fornecedorService: FornecedorService
  ) {}
  pessoa: Pessoa = { pessoa_juridica: false };
  pessoaOld: Pessoa = {};

  cnpj_cpfInvalido: Validação[] = [];

  emailInvalido: any = {};

  categorias: any = [];

  cnpjLoading: boolean = false;

  fileLoading: boolean = false;

  logtipoUrl: string = '';

  @ViewChild('logotipo', { static: false }) logotipo?: HTMLImageElement;

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
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Não foi possível carregar as categorias. - ' + error.error,
          });
        }
      });
  }

  getPessoa() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id != 0 && isFinite(id)) {
      this.pessoaService
        .getPessoa(id)
        .subscribe({
          next: async(pessoa) => {
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
            if (pessoa.empresa?.file?.id) {
              const url: any = await firstValueFrom(this.arquivoService.getUrlArquivo(pessoa.empresa?.file?.id))
              this.logtipoUrl = url.url;
            }
          },
          error: (error) => {
            console.error(error);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Não foi possível carregar a pessoa. - ' + error.error,
            });
          },
        });
    }
  }

  createPessoa() {
    let pessoaClean = this.cleanPessoa(this.pessoa);

    this.pessoaService
      .addPessoa(pessoaClean)
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
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Não foi possível criar a pessoa. - ' + error.error,
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
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Não foi possível atualizar a pessoa. - ' + error.error,
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
      // .pipe(debounceTime(1000))
      .subscribe({
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Não foi possível excluir a pessoa. - ' + error.error,
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

  deleteOrRestoreVendedor(){
    if(this.pessoa.vendedor?.id && this.pessoa.vendedor?.deletedAt == null){
      this.vendedorService.deleteVendedor(this.pessoa.vendedor).subscribe({
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Não foi possível excluir o vendedor. - ' + error.error,
          });
        },
        complete: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'O vendedor foi excluido.',
          });
          this.getPessoa();
        },
      });
    }else if (this.pessoa.vendedor?.id && this.pessoa.vendedor?.deletedAt != null) {

      this.vendedorService.restoreVendedor(this.pessoa.vendedor).subscribe({
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Não foi possível restaurar o vendedor. - ' + error.error,
          });
        },
        complete: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'O vendedor foi restaurado.',
          });
          this.getPessoa();
        },
      });
    }

  }

  deleteOrRestoreEmpresa(){
    if(this.pessoa.empresa?.id && this.pessoa.empresa?.deletedAt == null){
      this.empresaService.deleteEmpresa(this.pessoa.empresa).subscribe({
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Não foi possível excluir a empresa. - ' + error.error,
          });
        },
        complete: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'A empresa foi exluida.',
          });
          this.getPessoa();
        },
      });
    }else if(this.pessoa.empresa?.id && this.pessoa.empresa?.deletedAt != null){
      this.empresaService.restoreEmpresa(this.pessoa.empresa).subscribe({
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Não foi possível restaurar a empresa. - ' + error.error,
          });
        },
        complete: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'A empresa foi restaurada.',
          });
          this.getPessoa();
        },
      });
    }
  }

  deleteOrRestoreOperador(){
    if(this.pessoa.operador?.id && this.pessoa.operador?.deletedAt == null){
      this.operadorService.deleteOperador(this.pessoa.operador).subscribe({
        error: (error: any) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Não foi possível excluir o operador. - ' + error.error,
          });
        },
        complete: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'O operador foi exluido.',
          });
          this.getPessoa()
        },
      });
    }else if(this.pessoa.operador?.id && this.pessoa.operador?.deletedAt != null){
      this.operadorService.restoreOperador(this.pessoa.operador).subscribe({
        error: (error: any) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Não foi possível restaurar o operador. - ' + error.error,
          });
        },
        complete: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'O operador foi restaurado.',
          });
          this.getPessoa()
        },
      });
    }
  }

  deleteOrRestoreFornecedor(){
    if(this.pessoa.fornecedor?.id && this.pessoa.fornecedor?.deletedAt == null){
      this.fornecedorService.deleteFornecedor(this.pessoa.fornecedor).subscribe({
        error: (error: any) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Não foi possível excluir o fornecedor. - ' + error.error,
          });
        },
        complete: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'O fornecedor foi exluido.',
          });
          this.getPessoa()
        },
      });
    }else if(this.pessoa.fornecedor?.id && this.pessoa.fornecedor?.deletedAt != null){
      this.fornecedorService.restoreFornecedor(this.pessoa.fornecedor).subscribe({
        error: (error: any) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Não foi possível restaurar o fornecedor. - ' + error.error,
          });
        },
        complete: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'O fornecedor foi restaurado.',
          });
          this.getPessoa()
        },
      });
    }
  }

  newFornecedor() {
    this.pessoa.fornecedor = {};
  }

  newOperador() {
    this.pessoa.operador = {};
  }

  newEmpresa() {
    this.pessoa.empresa = {};
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
    window.history.back();;
  }

  confirm() {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir esta pessoa?',
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
              } ${consultaPJ.estabelecimento.logradouro}`;
              this.pessoa.complemento = consultaPJ.estabelecimento.complemento;
              this.pessoa.numero = consultaPJ.estabelecimento.numero;
              this.pessoa.bairro = consultaPJ.estabelecimento.bairro;
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
            this.pessoa.endereco = cep.logradouro;
            this.pessoa.complemento = cep.complemento;
            this.pessoa.bairro = cep.bairro;
            this.pessoa.municipio = cep.localidade;
            this.pessoa.uf = cep.uf;
          },
          error: (error: Error) => {
            console.log(error);
          },
        });
    }
  }

  onFileSelected(event: Event) {
    if (this.pessoa.empresa?.file?.id)
    this.arquivoService.deleteArquivo(this.pessoa.empresa?.file?.id).subscribe()
    const file: File = (event.target as HTMLInputElement).files![0];
    if (file) {
      this.fileLoading = true;
      this.arquivoService
        .uploadArquivo(file)
        // .pipe(debounceTime(1000))
        .subscribe({
          next: (arquivo: Arquivo) => {
            this.pessoa.empresa!.file = arquivo;
          },
          error: (error) => {
            this.fileLoading = false;
            console.log(error);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: `${error.status} - ${error.statusText} - ${error.error}`,
            });
          },
          complete: async() => {
            this.fileLoading = false;
            if (this.pessoa.empresa?.file?.id) {
              const url: any = await firstValueFrom(this.arquivoService.getUrlArquivo(this.pessoa.empresa?.file?.id))
              this.logtipoUrl = url.url;
            }
          },
        });
    }
  }

  async getLogo(id: any) {
    id = Number(id)
    if(Number.isFinite(id)){
      const url: any = await firstValueFrom(this.arquivoService.getUrlArquivo(id))
      return url.url;
    }
  }
}
