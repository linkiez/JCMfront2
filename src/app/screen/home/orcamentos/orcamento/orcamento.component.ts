import { RIRService } from 'src/app/services/rir.service';
import { EmpresaService } from './../../../../services/empresa.service';
import { ContatoService } from 'src/app/services/contato.service';
import { PessoaService } from './../../../../services/pessoa.service';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
  Observable,
  catchError,
  debounceTime,
  distinctUntilChanged,
  firstValueFrom,
  map,
} from 'rxjs';
import { IContato } from 'src/app/models/contato';
import {
  IOrcamento,
  IOrcamentoItem,
  IOrcamentoItemXlSX,
} from 'src/app/models/orcamento';
import { IPessoa } from 'src/app/models/pessoa';
import { IProduto } from 'src/app/models/produto';
import { IQuery } from 'src/app/models/query';
import { IVendedor } from 'src/app/models/vendedor';
import { ListaGenericaService } from 'src/app/services/lista-generica.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { validador } from 'src/app/utils/validadores';
import { VendedorService } from 'src/app/services/vendedor.service';
import { v4 as uuidv4 } from 'uuid';
import { OrcamentoService } from 'src/app/services/orcamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ArquivoService } from 'src/app/services/arquivo.service';
import * as XLSX from 'xlsx';
import { IRIR } from 'src/app/models/rir';
import { IEmpresa } from 'src/app/models/empresa';
import { consoleLogDev } from 'src/app/utils/consoleLogDev';
import { AutoCompleteSelectEvent } from 'primeng/autocomplete';

@Component({
  selector: 'app-orcamento',
  templateUrl: './orcamento.component.html',
  styleUrls: ['./orcamento.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrcamentoComponent implements OnInit {
  @ViewChild('orcamentoForm', { static: false }) orcamentoForm:
    | NgForm
    | undefined;

  orcamento: IOrcamento = {
    status: 'Orçamento',
    orcamento_items: [
      {
        uuid: uuidv4(),
        produto: { categoria: '', nome: '' },
        peso: 0,
        total: 0,
        total_hora: 0,
        total_manual: 0,
        total_peso: 0,
        imposto: 0,
        preco_hora: 0,
        preco_quilo: 0,
        tempo: '00:00:00',
        quantidade: 0,
        largura: 0,
        altura: 0,
        files: [],
      },
    ],
    contato: { nome: '', valor: '' },
    frete: 0,
    total: 0,
    desconto: 0,
    embalagem: 'Por conta do Fornecedor(nosso padrão)',
    transporte: 'FOB - Por Conta do Cliente',
    cond_pag: undefined,
    prazo_emdias: 0,
    empresa: {},
    vendastinies: [],
  };

  fileLoading: boolean = false;

  contatos: IContato[] = [];

  pessoas: IPessoa[] = [];

  vendedores: IVendedor[] = [];

  produtos: IProduto[] = [];

  rirs: IRIR[] = [];

  loadingSalvar: boolean = false;
  loadingAprovar: boolean = false;
  loadingImportar: boolean = false;

  processos$ = this.listaGenericaService
    .getByNameListaGenerica('processos')
    .pipe(
      map((listaGenerica: any) =>
        listaGenerica.lista_generica_items.map(
          (item: { valor: string }) => item.valor
        )
      ),
      catchError((error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Error ao buscar processos - ' + error.error.message,
        });
        return [];
      })
    );

  status$ = this.listaGenericaService
    .getByNameListaGenerica('statusOrcamento')
    .pipe(
      map((listaGenerica: any) => listaGenerica.lista_generica_items),
      catchError((error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Error ao buscar status - ' + error.error.message,
        });
        return [];
      })
    );

  contatoCategorias$ = this.listaGenericaService
    .getByNameListaGenerica('categoriaContato')
    .pipe(
      map((listaGenerica: any) => listaGenerica.lista_generica_items),
      catchError((error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Error ao buscar categorias de contato - ' + error.error.message,
        });
        return [];
      })
    );

  condicaoPagamento$ = this.listaGenericaService
    .getByNameListaGenerica('condicaoPagamento')
    .pipe(
      map((listaGenerica: any) =>
        listaGenerica.lista_generica_items.map(
          (item: { valor: string }) => item.valor
        )
      ),
      catchError((error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Error ao buscar condições de pagamento - ' + error.error.message,
        });
        return [];
      })
    );

  condicaoOrcamento$ = this.listaGenericaService
    .getByNameListaGenerica('condicoesOrcamento')
    .pipe(
      map((listaGenerica: any) =>
        listaGenerica.lista_generica_items.map(
          (item: { valor: string }) => item.valor
        )
      ),
      catchError((error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Error ao buscar condições de orçamento - ' + error.error.message,
        });
        return [];
      })
    );

  empresas: IEmpresa[] = [];

  aprovacaoOrcamento$ = this.listaGenericaService
    .getByNameListaGenerica('aprovadoOrcamento')
    .pipe(
      map((listaGenerica: any) =>
        listaGenerica.lista_generica_items.map(
          (item: { valor: string }) => item.valor
        )
      ),
      catchError((error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail:
            'Error ao buscar opções de aprovação de orçamento - ' + error.error.message,
        });
        return [];
      })
    );

  markupOptions$ = this.listaGenericaService
    .getByNameListaGenerica('markup')
    .pipe(
      map((listaGenerica: any) => listaGenerica.lista_generica_items),
      catchError((error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Error ao buscar opções de markup - ' + error.error.message,
        });
        return [];
      })
    );

  embalagensOptions = [
    'Por conta do Fornecedor(nosso padrão)',
    'Por conta do Cliente',
  ];

  transporteOptions = [
    'FOB - Por Conta do Cliente',
    'CIF - Por Conta do Fornecedor',
  ];

  id: number = 0;

  displayAprovacao: boolean = false;

  aprovacao: string = '';

  logotipoUrl: string = '';

  orcamentoItemsByDescription: IOrcamentoItem[] = [];

  constructor(
    private listaGenericaService: ListaGenericaService,
    private produtoService: ProdutoService,
    private pessoaService: PessoaService,
    private contatoService: ContatoService,
    private orcamentoService: OrcamentoService,
    private empresaService: EmpresaService,
    private arquivoService: ArquivoService,
    private vendedorService: VendedorService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private RIRService: RIRService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getEmpresas();
    this.getOrcamento();
  }

  searchContato(searchTerm: any, number?: boolean) {
    if (number) {
      searchTerm.query = searchTerm.query.replace(/[^\d]/g, '');
    }
    const query: IQuery = {
      page: 0,
      pageCount: 10,
      searchValue: searchTerm.query,
      deleted: false,
    };

    this.contatoService
      .getContatos(query)
      .pipe(distinctUntilChanged(), debounceTime(500))
      .subscribe({
        next: (consulta) => {
          this.contatos = consulta.contatos;
          if (this.contatos.length == 0 && this.orcamento.contato) {
            this.orcamento.contato.id = undefined;
          }
        },
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Error ao buscar contatos - ' + error.error.message,
          });
        },
      });
  }

  searchPessoa(searchTerm: any) {
    const query: IQuery = {
      page: 0,
      pageCount: 10,
      searchValue: searchTerm.query,
      fornecedor: false,
      operador: false,
      vendedor: false,
      deleted: false,
    };

    this.pessoaService
      .getPessoas(query)
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe({
        next: (consulta) => (this.pessoas = consulta.pessoas),
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Error ao buscar pessoas - ' + error.error.message,
          });
        },
      });
  }

  searchVendedor(searchTerm: any) {
    const query: IQuery = {
      page: 0,
      pageCount: 10,
      searchValue: searchTerm.query,
      deleted: false,
    };

    this.vendedorService
      .getVendedores(query)
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe({
        next: (consulta) => (this.vendedores = consulta.vendedores),
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Error ao buscar vendedores - ' + error.error.message,
          });
        },
      });
  }

  searchProduto(event: any) {
    const query: IQuery = {
      page: 0,
      pageCount: 25,
      searchValue: event.query,
      deleted: false,
    };

    this.produtoService
      .getProdutos(query)
      .pipe(
        distinctUntilChanged(), // recorda a ultima pesquisa
        debounceTime(500) // espera um tempo antes de começar
      )
      .subscribe({
        next: (consulta) => (this.produtos = consulta.produtos),
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Error ao buscar produtos - ' + error.error.message,
          });
        },
      });
  }

  searchOrcamentoItem(event: any) {
    const query: IQuery = {
      page: 0,
      pageCount: 25,
      searchValue: event.query.trim(),
      deleted: false,
      pessoa_id: this.orcamento.pessoa.id,
    };

    this.orcamentoService.getOrcamentoItemByDescription(query)
      .pipe(
        distinctUntilChanged(),
        debounceTime(500)
      )
      .subscribe({
        next: (consulta) =>{
          this.orcamentoItemsByDescription = consulta.orcamentoItems
        },
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Error ao buscar produtos - ' + error.error.message,
          });
        },
      });
  }

  newItem() {
    this.orcamento.orcamento_items.push({
      uuid: uuidv4(),
      produto: { categoria: '', nome: '' },
      material_incluido: false,
      peso: 0,
      total: 0,
      total_hora: 0,
      total_manual: 0,
      total_peso: 0,
      imposto: 0,
      preco_hora: 0,
      preco_quilo: 0,
      tempo: '00:00:00',
      quantidade: 0,
      largura: 0,
      altura: 0,
      files: [],
    });
  }

  removeItem(index: number) {
    this.orcamento.orcamento_items.splice(index, 1);
    this.calculaTotais();
  }

  onChangeItemImposto(event: any, item: IOrcamentoItem) {
    item.imposto = Number(event.replace(/[^\d]/g, '')) / 10000;
    if (item.imposto > 1) {
      item.imposto = 1;
    }
  }

  onChangeItemPrecoQuilo(event: any, item: IOrcamentoItem) {
    item.preco_quilo = Number(event.replace(/[^\d]/g, '')) / 100;
  }

  onChangeItemPrecoQuilo2(event: any, item: IOrcamentoItem) {
    item.preco_quilo =
      (item.produto?.pedido_compra_items[0].precoComIpi || 0) * event.valor2;
  }

  onChangeItemTotalManual(event: any, item: IOrcamentoItem) {
    item.total_manual = Number(event.replace(/[^\d]/g, '')) / 100;
  }

  onChangeItemPrecoHora(event: any, item: IOrcamentoItem) {
    item.preco_hora = Number(event.replace(/[^\d]/g, '')) / 100;
  }

  onChangeFrete(event: any) {
    this.orcamento.frete = Number(event.replace(/[^\d]/g, '')) / 100;
  }

  onChangeDesconto(event: any) {
    this.orcamento.desconto = Number(event.replace(/[^\d]/g, '')) / 100;
  }

  onChangeFiles(event: any, item: IOrcamentoItem) {
    item.files = event;
  }

  onChangeWhatsapp(event: any) {
    this.orcamento.contato!.valor = event.toString().replace(/[^\d]/g, '');
  }

  selectContato($event: any) {
    this.orcamento.contato = $event.value;
  }

  onChangeEmpresa(event: any) {
    this.orcamento.empresa = event;
    this.getLogoUrl();
  }

  onPrecoSixMonthsAgo(item: IOrcamentoItem) {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    if (new Date(item.produto.pedido_compra_items[0].pedido_compra.data_emissao) < sixMonthsAgo) return false;
    return true
  }

  calculaPeso(item: IOrcamentoItem) {
    if (item.produto !== null && item.produto !== undefined) {
      switch (item.produto.categoria) {
        case 'Chapa':
          item.peso =
            ((item.largura || 0) / 1000) *
            ((item.altura || 0) / 1000) *
            (item.produto.espessura || 0) *
            (item.produto.peso || 0) *
            (item.quantidade || 0);
          break;
        case 'Barra':
          item.peso =
            ((item.largura || 0) / 1000) *
            (item.produto.peso || 0) *
            (item.quantidade || 0);
          break;
        case 'Peça':
          item.peso = (item.produto.peso || 0) * (item.quantidade || 0);
          break;
        default:
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: `Categoria do produto invalida: ${item.produto.categoria}`,
          });
          throw new Error(
            `Categoria do produto invalida: ${item.produto.categoria}`
          );
      }

      if (item.produto.categoria !== 'Peça') {
        item.total_peso = (item.peso || 0) * (item.preco_quilo || 0);
      } else {
        item.total_peso = (item.quantidade || 0) * (item.preco_quilo || 0);
      }

      if (item.material_incluido) {
        item.custo =
          (item.peso || 0) *
          ((item.produto.pedido_compra_items || [])[0]?.precoComIpi || 0);
      }

      this.calculaTotal(item);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Produto inválido',
      });
      throw new Error('Produto inválido');
    }
  }

  calculaHora(item: IOrcamentoItem) {
    this.calculaPeso(item);
    const [hours = '0', minutes = '0', seconds = '0'] =
      item.tempo?.split(':') ?? [];

    const hora: number =
      Number(hours) + Number(minutes) / 60 + Number(seconds) / 3600;

    item.total_hora =
      (hora || 0) * (item.preco_hora || 0) * (item.quantidade || 0);

    this.calculaTotal(item);
  }

  calculaTotal(item: IOrcamentoItem) {
    const total =
      Number((item.total_peso || 0) + Number(item.total_hora || 0)) /
      (1 - Number(item.imposto || 0));

    // if(total <= 0){
    //   this.messageService.add({
    //     severity: 'error',
    //     summary: 'Erro',
    //     detail: 'Total do item inválido',
    //   });
    //   throw new Error('Total do item inválido');
    // }

    if ((item.total_manual || 0) > 0) {
      item.total = Number(item.total_manual);
    } else {
      item.total = total;
    }

    this.calculaTotais();
  }

  calculaTotais() {
    const total_items = this.orcamento.orcamento_items.reduce(
      (total, item) => Number(total || 0) + Number(item.total || 0),
      0
    );

    this.orcamento.total = +(
      Number(total_items || 0) +
      Number(this.orcamento.frete || 0) -
      Number(this.orcamento.desconto || 0)
    ).toFixed(2);
  }

  validaEmail(email: string) {
    const emailValidador = validador.filter(
      (validacao) => validacao.campo === 'email'
    )[0];

    return emailValidador.funcao(email);
  }

  getBackOrcamentos() {
    window.history.back();
  }

  getOrcamento() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id != 0) {
      this.orcamentoService.getOrcamento(id).subscribe({
        next: (response: IOrcamento) => {
          if (response.contato === null) response.contato = {};
          if (response.pessoa === null) response.pessoa = {};
          if (response.vendedor === null) response.vendedor = {};
          if (response.empresa === null) response.empresa = {};
          response.orcamento_items.forEach((item: IOrcamentoItem) => {
            item.uuid = uuidv4();
          });
          this.orcamento = response;
          consoleLogDev(this.orcamento);
        },
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Error ao buscar orçamento - ' + error.error.message,
          });
        },
        complete: () => {
          this.getLogoUrl();
        },
      });
    }
  }

  async getLogoUrl() {
    if (this.orcamento.empresa?.logoColor?.id) {
      const url: string = await firstValueFrom(
        this.arquivoService.getUrlArquivo(this.orcamento.empresa?.logoColor?.id)
      );
      this.logotipoUrl = url;
    } else {
      this.logotipoUrl = '';
    }
  }

  getEmpresas() {
    this.empresaService
    .getEmpresas({ page: 0, pageCount: 10, searchValue: '', deleted: false })
    .pipe(
      map((empresas: any) => empresas.empresas)
    ).subscribe({
      next: (response: IEmpresa[]) => {
        this.empresas = response;
      },
      error: (error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Error ao buscar empresas -' + error.error.message,
        });
      },
    });
  }

  create(clonar?: boolean) {
    const orcamentoSubmit: IOrcamento = this.orcamento;
    orcamentoSubmit.status = 'Orçamento';
    this.loadingSalvar = true;
    this.orcamentoService
      .addOrcamento(orcamentoSubmit)
      .pipe(debounceTime(1000))
      .subscribe({
        next: (response) => {
          if (response.contato === null) response.contato = {};
          if (response.pessoa === null) response.pessoa = {};
          if (response.vendedor === null) response.vendedor = {};
          if (response.empresa === null) response.empresa = {};
          response.orcamento_items.forEach((item: IOrcamentoItem) => {
            item.uuid = uuidv4();
          });
          this.orcamento = response;
          this.id = response.id;
        },
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail:
              `Error ao ${clonar ? 'clonar' : 'criar'} orçamento - ` +
              error.error.message,
          });
          this.loadingSalvar = false;
        },
        complete: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: `O orçamento foi ${clonar ? 'clonado' : 'criado'}.`,
          });
          this.loadingSalvar = false;
          this.router.navigate([`/home/orcamentos/${this.orcamento.id}`]);
        },
      });
  }

  update() {
    const orcamentoSubmit: IOrcamento = this.orcamento;
    this.loadingSalvar = true;
    this.orcamentoService
      .updateOrcamento(orcamentoSubmit)
      .pipe(debounceTime(1000))
      .subscribe({
        next: (response) => {
          if (response.contato === null) response.contato = {};
          if (response.pessoa === null) response.pessoa = {};
          if (response.vendedor === null) response.vendedor = {};
          if (response.empresa === null) response.empresa = {};
          response.orcamento_items.forEach((item: IOrcamentoItem) => {
            item.uuid = uuidv4();
          });
          this.orcamento = response;
        },
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Error ao atualizar orçamento - ' + error.error.message,
          });
          this.loadingSalvar = false;
        },
        complete: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'O orçamento foi atualizado.',
          });
          this.loadingSalvar = false;
        },
      });
  }

  async createOrUpdate() {
    if (await this.validacoes()) {
      if (Number(this.route.snapshot.paramMap.get('id')) === 0) {
        this.create();
      } else {
        this.update();
      }
    }
  }

  delete() {
    this.orcamentoService.deleteOrcamento(this.orcamento).subscribe({
      error: (error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Error ao apagar orçamento - ' + error.error.message,
        });
      },
      complete: () => {
        this.getBackOrcamentos();
      },
    });
  }

  confirm() {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir este pedido de compra?',
      accept: () => {
        this.delete();
      },
    });
  }

  async validacoes() {
    let valido = true;
    const idExistente = await firstValueFrom(
      this.orcamentoService.getOrcamento(this.orcamento.id || 0)
    );

    if (this.id == 0 && idExistente != null && this.orcamento.id) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Já existe um orçamento com este número.',
      });
      valido = false;
    }
    if (!Number.isFinite(Number(this.orcamento.id)) && this.orcamento.id) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'O número do orçamento não é um numero.',
      });
      valido = false;
    }
    if (
      (!this.orcamento.contato?.valor ||
        this.orcamento.contato?.valor.length == 0) &&
      (!this.orcamento.contato?.nome ||
        this.orcamento.contato?.nome.length == 0)
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'O contato é obrigatório.',
      });
      valido = false;
    }

    if (this.orcamento.orcamento_items.length == 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'É necessário ter pelo menos um item no orçamento.',
      });
      valido = false;
    }

    if (
      this.orcamento.prazo_emdias == 0 ||
      this.orcamento.prazo_emdias == undefined
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'O prazo não pode ser 0.',
      });
      valido = false;
    }

    if (this.orcamento.prazo_emdias! < 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'O prazo não pode ser negativo.',
      });
      valido = false;
    }
    if (
      this.orcamento.pessoa?.nome == undefined &&
      this.orcamento.contato?.valor == undefined
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'É necessário ter um cliente ou um contato.',
      });
      valido = false;
    }

    if (this.orcamento.vendedor?.id == undefined) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'É necessário ter um vendedor.',
      });
      valido = false;
    }
    if (
      (this.orcamento.contato?.tipo == 'Email' ||
        this.orcamento.contato?.tipo == 'Email Nfe') &&
      !this.validaEmail(this.orcamento.contato?.valor || '')
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'O email do contato é inválido.',
      });
      valido = false;
    }
    if (!this.orcamento.total) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'O valor total não pode ser 0.',
      });
      valido = false;
    }
    if (this.orcamento.orcamento_items.length <= 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'É necessário ter pelo menos um item no orçamento.',
      });
      valido = false;
    }

    if (!this.orcamento.empresa) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'É necessário ter uma empresa para faturamento.',
      });
      valido = false;
    }
    if (!this.orcamento.transporte) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'É necessário selecionar tipo de transporte.',
      });
      valido = false;
    }
    if (!this.orcamento.cond_pag){
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'É necessário selecionar a condição de pagamento.',
      });
      valido = false;
    }
    if (
      !this.orcamento.contato?.id &&
      (this.orcamento.contato?.nome?? "").split(' ').length < 2
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'É necessário que o contato nome tenha mais de 1 palavras.',
      });
      valido = false;
    }
    this.orcamento.orcamento_items.forEach((item, index) => {
      if (item.quantidade == 0) {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: `A quantidade não pode ser 0. Item: ${index + 1}`,
        });
        valido = false;
      }
      if (item.preco_quilo == 0 && item.preco_hora == 0) {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: `O valor não pode ser 0. Item: ${index + 1}`,
        });
        valido = false;
      }
      if (item.processo?.length == 0 || item.processo == undefined) {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: `É necessário ter pelo menos um processo. Item: ${index + 1}`,
        });
        valido = false;
      }
      if (item.produto == undefined) {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: `É necessário selecionar um produto. Item: ${index + 1}`,
        });
        valido = false;
      }
      if (!item.total || item.total <= 0) {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: `O total não pode ser 0. Item: ${index + 1}`,
        });
        valido = false;
      }
    });
    return valido;
  }

  async clonar() {
    if ((await this.validacoes()) && this.orcamento.id != undefined) {
      this.orcamento.id = undefined;
      this.orcamento.orcamento_items = this.orcamento.orcamento_items.map(
        (item: IOrcamentoItem) => {
          item.id = undefined;
          return item;
        }
      );
      this.orcamento.status = 'Orçamento';
      this.orcamento.createdAt = undefined;
      this.orcamento.updatedAt = undefined;
      this.create(true);
    }
  }

  async aprovar() {
    if (!this.orcamento.pessoa?.cnpj_cpf) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'É necessário que a pessoa tenha CPF/CNPJ cadastrado.',
      });
    } else {
      this.loadingAprovar = true;
      this.orcamentoService
        .aprovarOrcamento(this.orcamento.id!, this.aprovacao)
        .subscribe({
          next: (response) => {
            // console.log(response);
          },
          error: (error) => {
            console.error(error);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: `Erro ao aprovar o orçamento - ${error.error.message}`,
            });
            this.loadingAprovar = false;
          },
          complete: () => {
            this.getOrcamento();
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Orçamento aprovado com sucesso.',
            });
            this.loadingAprovar = false;
          },
        });
    }
    this.displayAprovacao = false;
  }

  exportOrcamentoItemToXlsx() {
    const data = this.orcamento.orcamento_items.map((item, index) => {
      return {
        item: index + 1,
        descricao: item.descricao,
        produto: item.produto?.nome,
        material_incluido: item.material_incluido ? 'Sim' : 'Não',
        processo: (item.processo as string[])?.join(', '),
        largura: item.largura,
        altura: item.altura,
        quantidade: item.quantidade,
        imposto: item.imposto,
        preco_quilo: item.preco_quilo,
        tempo: item.tempo,
        preco_hora: item.preco_hora,
        total_manual: item.total_manual,
      };
    });
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'orcamento_items.xlsx');
  }

  importOrcamentoItemFromXlsx(event: Event) {
    this.loadingImportar = true;
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    const file = files[0];
    const reader: FileReader = new FileReader();
    reader.onload = async (e: any) => {
      const bstr: string = e.target.result;
      const data = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = data.SheetNames[0];
      const ws: XLSX.WorkSheet = data.Sheets[wsname];
      const orcamento_items: IOrcamentoItemXlSX[] =
        XLSX.utils.sheet_to_json(ws);
      if (this.validaXLSX(orcamento_items)) {
        const listaProdutos = await this.procuraProdutos(orcamento_items);
        orcamento_items.forEach((item) => {
          const produto = listaProdutos.find(
            (produto) => produto.nome === item.produto
          );
          if (produto) {
            if (this.orcamento.orcamento_items[item.item - 1]) {
              this.orcamento.orcamento_items[item.item - 1].descricao =
                item.descricao;
              this.orcamento.orcamento_items[item.item - 1].produto = produto;
              this.orcamento.orcamento_items[item.item - 1].material_incluido =
                item.material_incluido === 'Sim';
              this.orcamento.orcamento_items[item.item - 1].processo =
                item.processo?.split(',').map((processo) => processo.trim());
              this.orcamento.orcamento_items[item.item - 1].largura =
                +item.largura;
              this.orcamento.orcamento_items[item.item - 1].altura =
                +item.altura;
              this.orcamento.orcamento_items[item.item - 1].quantidade =
                +item.quantidade;
              this.orcamento.orcamento_items[item.item - 1].imposto =
                +item.imposto;
              this.orcamento.orcamento_items[item.item - 1].preco_quilo =
                +item.preco_quilo;
              this.orcamento.orcamento_items[item.item - 1].tempo = item.tempo;
              this.orcamento.orcamento_items[item.item - 1].preco_hora =
                +item.preco_hora;
              this.orcamento.orcamento_items[item.item - 1].total_manual =
                +item.total_manual;
            } else {
              const orcamento_item: IOrcamentoItem = {
                descricao: item.descricao,
                produto: produto,
                material_incluido: item.material_incluido === 'Sim',
                processo: item.processo
                  ?.split(',')
                  .map((processo) => processo.trim()),
                largura: +item.largura,
                altura: +item.altura,
                quantidade: +item.quantidade,
                imposto: +item.imposto,
                preco_quilo: +item.preco_quilo,
                tempo: item.tempo,
                preco_hora: +item.preco_hora,
                total_manual: +item.total_manual,
              };
              this.orcamento.orcamento_items.push(orcamento_item);
            }
            this.orcamento.orcamento_items.forEach((item) => {
              this.calculaPeso(item);
              this.calculaHora(item);
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: `Produto ${item.produto} não encontrado no item ${item.item}.`,
            });
          }
        });
      }
      this.loadingImportar = false;
    };
    reader.readAsBinaryString(file);
  }

  async procuraProdutos(
    orcamento_items: IOrcamentoItemXlSX[]
  ): Promise<IProduto[]> {
    const listaProdutos: IProduto[] = [];

    for (const item of orcamento_items) {
      const find = listaProdutos.find(
        (produto) => produto.nome === item.produto
      );

      if (!find) {
        try {
          const produto$ = this.produtoService.getProdutoByName(
            item.produto.trim()
          );
          const produto = await firstValueFrom(produto$);
          if (!produto) {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: `Produto ${item.produto} não encontrado.`,
            });
            return [];
          } else listaProdutos.push(produto);
        } catch (error) {
          // Handle any errors that may occur
          console.error(error);
        }
      }
    }

    return listaProdutos;
  }

  validaXLSX(orcamento_items: IOrcamentoItemXlSX[]) {
    let valido = true;
    orcamento_items.forEach((item) => {
      if (!item.produto) {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: `Produto não informado no item ${item.item}.`,
        });
        valido = false;
      }
      if (!item.processo) {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: `Processo não informado no item ${item.item}.`,
        });
        valido = false;
      }
      if (!item.largura) {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: `Largura não informada no item ${item.item}.`,
        });
        valido = false;
      }
      if (!isFinite(item.largura) && item.largura) {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: `Largura não é um numero valido no item ${item.item}.`,
        });
        valido = false;
      }
      if (!item.altura) {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: `Altura não informada no item ${item.item}.`,
        });
        valido = false;
      }
      if (!isFinite(item.altura) && item.altura) {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: `Altura não é um numero valido no item ${item.item}.`,
        });
        valido = false;
      }
      if (!item.quantidade) {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: `Quantidade não informada no item ${item.item}.`,
        });
        valido = false;
      }
      if (!isFinite(+item.quantidade) && item.quantidade) {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: `Quantidade não é um numero valido no item ${item.item}.`,
        });
        valido = false;
      }
      if (!item.imposto && item.imposto !== 0) {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: `Imposto não informado no item ${item.item}.`,
        });
        valido = false;
      }
      if (!isFinite(+item.imposto) && item.imposto) {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: `Imposto não é um numero valido no item ${item.item}.`,
        });
        valido = false;
      }
      if (!isFinite(+item.preco_quilo) && item.preco_quilo) {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: `Preço Quilo não é um numero valido no item ${item.item}.`,
        });
        valido = false;
      }
      if (
        !/^([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/.test(item.tempo) &&
        item.tempo
      ) {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: `Tempo formato inválido (não corresponde ao formato de tempo) no item ${item.item}.`,
        });
        valido = false;
      }
      if (!isFinite(+item.preco_hora) && item.preco_hora) {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: `Preço Hora não é um numero valido no item ${item.item}.`,
        });
        valido = false;
      }
      if (!isFinite(+item.total_manual) && item.total_manual) {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: `Total Manual não é um numero valido no item ${item.item}.`,
        });
        valido = false;
      }
    });

    return valido;
  }

  searchRir(item: IOrcamentoItem) {
    if (this.orcamento.pessoa && item.produto)
      this.RIRService.getRIRsByPessoaAndProduto(
        this.orcamento.pessoa.id!,
        item.produto.id!
      )
        .pipe(debounceTime(500), distinctUntilChanged())
        .subscribe({
          next: (response) => {
            this.rirs = response;
          },
          error: (error) => {
            console.error(error);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao buscar RIRs - ' + error.error.message,
            });
          },
        });
  }

  setPrecoPecaProduto(item: IOrcamentoItem) {
    if (item.produto?.categoria === 'Peça') {
      item.preco_quilo = item.produto?.preco;
    }
  }

  downloadAllFiles() {
    this.arquivoService.downloadAllFilesFromArray(this.orcamento.orcamento_items);
  }

  onSelectOrcamentoItem(event: AutoCompleteSelectEvent, index: number){
    const selectedItem = event.value as IOrcamentoItem;
    delete selectedItem.id;
    delete selectedItem.createdAt
    delete selectedItem.updatedAt;

    this.orcamento.orcamento_items[index] = { ...selectedItem };
    this.calculaPeso(this.orcamento.orcamento_items[index]);
    this.setPrecoPecaProduto(this.orcamento.orcamento_items[index])
  }
}
