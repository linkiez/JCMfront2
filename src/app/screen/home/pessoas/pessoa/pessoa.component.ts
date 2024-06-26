import { EmpresaService } from './../../../../services/empresa.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { debounceTime, firstValueFrom, map, Subscription } from 'rxjs';
import { IPessoa } from 'src/app/models/pessoa';
import { PessoaService } from 'src/app/services/pessoa.service';
import { IContato } from 'src/app/models/contato';
import { DOCUMENT } from '@angular/common';
import { ArquivoService } from 'src/app/services/arquivo.service';
import { IValidação } from 'src/app/models/validacao';
import { ListaGenericaService } from 'src/app/services/lista-generica.service';
import { validador } from 'src/app/utils/validadores';
import { IArquivo } from 'src/app/models/arquivo';
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
  pessoa: IPessoa = { pessoa_juridica: false };
  pessoaOld: IPessoa = {};

  cnpj_cpfInvalido: IValidação[] = [];

  emailInvalido: any = {};

  categorias: any = [];

  cnpjLoading: boolean = false;

  logoColorLoading: boolean = false;
  logoBlackLoading: boolean = false;

  logoColorUrl: string = '';
  logoBlackUrl: string = '';

  @ViewChild('logoColor', { static: false }) logoColor?: HTMLImageElement;
  @ViewChild('logoBlack', { static: false }) logoBlack?: HTMLImageElement;

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
            detail: 'Não foi possível carregar as categorias. - ' + error.error.message,
          });
        },
      });
  }

  getPessoa() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id != 0 && isFinite(id)) {
      this.pessoaService.getPessoa(id).subscribe({
        next: async (pessoa) => {
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
          if (pessoa.empresa?.logoColor?.id) {
            this.logoColorUrl = await firstValueFrom(
              this.arquivoService.getUrlArquivo(pessoa.empresa?.logoColor?.id)
            );
          }
          if (pessoa.empresa?.logoBlack?.id) {
            this.logoBlackUrl = await firstValueFrom(
              this.arquivoService.getUrlArquivo(pessoa.empresa?.logoBlack?.id)
            );
          }
          this.pessoa = pessoa;
        },
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Não foi possível carregar a pessoa. - ' + error.error.message,
          });
        },
      });
    }
  }

  createPessoa() {
    const pessoaClean = this.cleanPessoa(this.pessoa);

    this.pessoaService.addPessoa(pessoaClean).subscribe({
      next: async (pessoa) => {
        pessoa.data_nasc = new Date(pessoa.data_nasc!.toString());
        if (pessoa.fornecedor?.data_aprov)
          pessoa.fornecedor.data_aprov = new Date(
            pessoa.fornecedor.data_aprov.toString()
          );
        if (pessoa.fornecedor?.data_venc)
          pessoa.fornecedor.data_venc = new Date(
            pessoa.fornecedor.data_venc.toString()
          );
        if (pessoa.empresa?.logoColor?.id) {
          this.logoColorUrl = await firstValueFrom(
            this.arquivoService.getUrlArquivo(pessoa.empresa?.logoColor?.id)
          );
        }
        if (pessoa.empresa?.logoBlack?.id) {
          this.logoBlackUrl = await firstValueFrom(
            this.arquivoService.getUrlArquivo(pessoa.empresa?.logoBlack?.id)
          );
        }
        this.pessoa = pessoa;
      },
      error: (error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível criar a pessoa. - ' + error.error.message,
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
    const pessoaClean = this.cleanPessoa(this.pessoa);
    this.pessoaService.updatePessoa(pessoaClean).subscribe({
      next: async (pessoa) => {
        pessoa.data_nasc = new Date(pessoa.data_nasc!);
        if (pessoa.fornecedor?.data_aprov)
          pessoa.fornecedor.data_aprov = new Date(
            pessoa.fornecedor.data_aprov
          );
        if (pessoa.fornecedor?.data_venc)
          pessoa.fornecedor.data_venc = new Date(
            pessoa.fornecedor.data_venc
          );
        if (pessoa.empresa?.logoColor?.id) {
          this.logoColorUrl = await firstValueFrom(
            this.arquivoService.getUrlArquivo(pessoa.empresa?.logoColor?.id)
          );
        }
        if (pessoa.empresa?.logoBlack?.id) {
          this.logoBlackUrl = await firstValueFrom(
            this.arquivoService.getUrlArquivo(pessoa.empresa?.logoBlack?.id)
          );
        }
        this.pessoa = pessoa;
      },
      error: (error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível atualizar a pessoa. - ' + error.error.message,
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

  cleanPessoa(pessoa: IPessoa) {
    if (pessoa.telefone)
      pessoa.telefone = Number(pessoa.telefone.toString().replace(/\D/g, ''));
    if (pessoa.cnpj_cpf)
      pessoa.cnpj_cpf = pessoa.cnpj_cpf.toString().replace(/\D/g, '');
    if (pessoa.ie_rg) pessoa.ie_rg = pessoa.ie_rg.toString().replace(/\D/g, '');
    pessoa.contatos = pessoa.contatos?.map((contato: IContato) => {
      if (contato.tipo == 'Telefone' || contato.tipo == 'WhatsApp')
        contato.valor = (contato.valor || '').toString().replace(/\D/g, '');
      return contato;
    });
    return pessoa;
  }

  createOrUpdate() {
    const emailInvalido = Object.values(this.emailInvalido).filter(
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
            detail: 'Não foi possível excluir a pessoa. - ' + error.error.message,
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

  deleteOrRestoreVendedor() {
    if (this.pessoa.vendedor?.id && this.pessoa.vendedor?.deletedAt == null) {
      this.vendedorService.deleteVendedor(this.pessoa.vendedor).subscribe({
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Não foi possível excluir o vendedor. - ' + error.error.message,
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
    } else if (
      this.pessoa.vendedor?.id &&
      this.pessoa.vendedor?.deletedAt != null
    ) {
      this.vendedorService.restoreVendedor(this.pessoa.vendedor).subscribe({
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Não foi possível restaurar o vendedor. - ' + error.error.message,
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

  deleteOrRestoreEmpresa() {
    if (this.pessoa.empresa?.id && this.pessoa.empresa?.deletedAt == null) {
      this.empresaService.deleteEmpresa(this.pessoa.empresa).subscribe({
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Não foi possível excluir a empresa. - ' + error.error.message,
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
    } else if (
      this.pessoa.empresa?.id &&
      this.pessoa.empresa?.deletedAt != null
    ) {
      this.empresaService.restoreEmpresa(this.pessoa.empresa).subscribe({
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Não foi possível restaurar a empresa. - ' + error.error.message,
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

  deleteOrRestoreOperador() {
    if (this.pessoa.operador?.id && this.pessoa.operador?.deletedAt == null) {
      this.operadorService.deleteOperador(this.pessoa.operador).subscribe({
        error: (error: any) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Não foi possível excluir o operador. - ' + error.error.message,
          });
        },
        complete: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'O operador foi exluido.',
          });
          this.getPessoa();
        },
      });
    } else if (
      this.pessoa.operador?.id &&
      this.pessoa.operador?.deletedAt != null
    ) {
      this.operadorService.restoreOperador(this.pessoa.operador).subscribe({
        error: (error: any) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Não foi possível restaurar o operador. - ' + error.error.message,
          });
        },
        complete: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'O operador foi restaurado.',
          });
          this.getPessoa();
        },
      });
    }
  }

  deleteOrRestoreFornecedor() {
    if (
      this.pessoa.fornecedor?.id &&
      this.pessoa.fornecedor?.deletedAt == null
    ) {
      this.fornecedorService
        .deleteFornecedor(this.pessoa.fornecedor)
        .subscribe({
          error: (error: any) => {
            console.error(error);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Não foi possível excluir o fornecedor. - ' + error.error.message,
            });
          },
          complete: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'O fornecedor foi exluido.',
            });
            this.getPessoa();
          },
        });
    } else if (
      this.pessoa.fornecedor?.id &&
      this.pessoa.fornecedor?.deletedAt != null
    ) {
      this.fornecedorService
        .restoreFornecedor(this.pessoa.fornecedor)
        .subscribe({
          error: (error: any) => {
            console.error(error);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail:
                'Não foi possível restaurar o fornecedor. - ' + error.error.message,
            });
          },
          complete: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'O fornecedor foi restaurado.',
            });
            this.getPessoa();
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
    const contatos: IContato[] = [];
    if (!this.pessoa.contatos) this.pessoa.contatos = contatos;
    this.pessoa.contatos.push({});
  }

  removeContato(rowIndex: number) {
    this.pessoa.contatos!.splice(rowIndex, 1);
  }

  getBackPessoas() {
    window.history.back();
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
    const cnpj_cpfValidador = validador.filter(
      (validacao) => validacao.campo === 'cnpj_cpf'
    );

    const cnpj_cpfValidado = cnpj_cpfValidador.map(async (validacao) => {
      validacao.resultado = await validacao.funcao(this.pessoa);
      return validacao;
    });
    Promise.all(cnpj_cpfValidado).then((validado) => {
      const cnpj_cpfInvalido = validado.filter(
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
              this.pessoa.endereco = `${consultaPJ.estabelecimento.tipo_logradouro} ${consultaPJ.estabelecimento.logradouro}`;
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
    const emailValidador = validador.filter(
      (validacao) => validacao.campo === 'email'
    )[0];

    this.emailInvalido[campo] = emailValidador.funcao(email);
  }

  consultaCep() {
    const cep = this.pessoa.cep?.toString().replace(/\D/g, '');

    const cepQuantosNumeros = cep?.split('').length;

    if (cepQuantosNumeros == 8 && cep) {
      this.pessoaService
        .consultaCep(cep)
        .pipe(debounceTime(1000))
        .subscribe({
          next: (cep: any) => {
            this.pessoa.endereco = cep.logradouro;
            this.pessoa.complemento = cep.complemento;
            this.pessoa.bairro = cep.bairro;
            this.pessoa.municipio = cep.localidade;
            this.pessoa.uf = cep.uf;
          },
          error: (error: Error) => {
            console.error(error);
          },
        });
    }
  }

  onFileSelected(event: Event, tipo: 'logoColor' | 'logoBlack') {
    if (this.pessoa.empresa?.[tipo]?.id)
      this.arquivoService
        .deleteArquivo(this.pessoa.empresa?.[tipo]?.id as number)
        .subscribe();
    const file: File = (event.target as HTMLInputElement).files![0];
    if (file) {
      this[`${tipo}Loading`] = true;
      this.arquivoService
        .uploadArquivo(file)
        // .pipe(debounceTime(1000))
        .subscribe({
          next: (arquivo: IArquivo) => {
            this.pessoa.empresa![tipo] = arquivo;
          },
          error: (error) => {
            this[`${tipo}Loading`] = false;
            console.error(error);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: `Nao foi possivel fazer o upload do arquivo. - ${error.error.message}`,
            });
          },
          complete: async () => {
            this[`${tipo}Loading`] = false;
            this[`${tipo}Url`] = await firstValueFrom(
              this.arquivoService.getUrlArquivo(
                this.pessoa.empresa?.[tipo]?.id as number
              )
            );
          },
        });
    }
  }

  async getLogo(id: number): Promise<string> {
    return await firstValueFrom(this.arquivoService.getUrlArquivo(id));
  }
}
