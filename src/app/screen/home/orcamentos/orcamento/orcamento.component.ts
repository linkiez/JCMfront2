import { ContatoService } from 'src/app/services/contato.service';
import { PessoaService } from './../../../../services/pessoa.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { Contato } from 'src/app/models/contato';
import { Orcamento, OrcamentoItem } from 'src/app/models/orcamento';
import { Pessoa } from 'src/app/models/pessoa';
import { Produto } from 'src/app/models/produto';
import { Query } from 'src/app/models/query';
import { Vendedor } from 'src/app/models/vendedor';
import { ListaGenericaService } from 'src/app/services/lista-generica.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { validador } from 'src/app/utils/validadores';
import { VendedorService } from 'src/app/services/vendedor.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-orcamento',
  templateUrl: './orcamento.component.html',
  styleUrls: ['./orcamento.component.css'],
})
export class OrcamentoComponent implements OnInit {
  orcamento: Orcamento = {
    status: 'Orçamento',
    orcamento_item: [
      {
        uuid: uuidv4(),
        produto: {},
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
      },
    ],
    contato: {},
    frete: 0,
    total: 0,
    embalagem: 'Por conta do Fornecedor(nosso padrão)',
    cond_pag: 'AVISTA',
  };

  contatos: Contato[] = [];

  pessoas: Pessoa[] = [];

  vendedores: Vendedor[] = [];

  produtos: Produto[] = [];

  processos$ = this.listaGenericaService
    .getByNameListaGenerica('processos')
    .pipe(
      map((listaGenerica: any) =>
        listaGenerica.lista_generica_items.map(
          (item: { valor: string }) => item.valor
        )
      )
    );

  status$ = this.listaGenericaService
    .getByNameListaGenerica('statusOrcamento')
    .pipe(map((listaGenerica: any) => listaGenerica.lista_generica_items));

  contatoCategorias$ = this.listaGenericaService
    .getByNameListaGenerica('categoriaContato')
    .pipe(map((listaGenerica: any) => listaGenerica.lista_generica_items));

  condicaoPagamento$ = this.listaGenericaService
    .getByNameListaGenerica('condicaoPagamento')
    .pipe(
      map((listaGenerica: any) =>
        listaGenerica.lista_generica_items.map(
          (item: { valor: string }) => item.valor
        )
      )
    );

  condicaoOrcamento$ = this.listaGenericaService
    .getByNameListaGenerica('condicoesOrcamento')
    .pipe(
      map((listaGenerica: any) =>
        listaGenerica.lista_generica_items.map(
          (item: { valor: string }) => item.valor
        )
      )
    );

  embalagensOptions = [
    'Por conta do Fornecedor(nosso padrão)',
    'Por conta do Cliente',
  ];

  transporteOptions = [
    'FOB - Por Conta do Cliente',
    'CIF - Por Conta do Fornecedor',
  ];

  constructor(
    private listaGenericaService: ListaGenericaService,
    private produtoService: ProdutoService,
    private pessoaService: PessoaService,
    private contatoService: ContatoService,
    private vendedorService: VendedorService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {}

  searchContato(searchTerm: any) {
    let query: Query = {
      page: 0,
      pageCount: 10,
      searchValue: searchTerm.query,
      deleted: false,
    };

    this.contatoService
      .getContatos(query)
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe({
        next: (consulta) => (this.contatos = consulta.contatos),
        error: (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: error.message,
          });
        },
      });
  }

  searchPessoa(searchTerm: any) {
    let query: Query = {
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
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe({
        next: (consulta) => (this.pessoas = consulta.pessoas),
        error: (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: error.message,
          });
        },
      });
  }

  searchVendedor(searchTerm: any) {
    let query: Query = {
      page: 0,
      pageCount: 10,
      searchValue: searchTerm.query,
      deleted: false,
    };

    this.vendedorService
      .getVendedores(query)
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe({
        next: (consulta) => (this.vendedores = consulta.vendedores),
        error: (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: error.message,
          });
        },
      });
  }

  searchProduto(event: any) {
    let query: Query = {
      page: 0,
      pageCount: 10,
      searchValue: event.query,
      deleted: false,
    };

    this.produtoService
      .getProdutos(query)
      .pipe(
        distinctUntilChanged(), // recorda a ultima pesquisa
        debounceTime(1000) // espera um tempo antes de começar
      )
      .subscribe({
        next: (consulta) => (this.produtos = consulta.produtos),
        error: (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: error.message,
          });
        },
      });
  }

  newItem() {
    this.orcamento.orcamento_item.push({
      uuid: uuidv4(),
      produto: {},
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
    });
  }

  removeItem(index: number) {
    this.orcamento.orcamento_item.splice(index, 1);
  }

  onChangeItemImposto(event: any, item: OrcamentoItem) {
    item.imposto = event.replace(/[^\d]/g, '') / 10000;
  }

  onChangeItemPrecoQuilo(event: any, item: OrcamentoItem) {
    item.preco_quilo = event.replace(/[^\d]/g, '') / 100;
  }

  onChangeItemTotalManual(event: any, item: OrcamentoItem) {
    item.total_manual = event.replace(/[^\d]/g, '') / 100;
  }

  onChangeItemPrecoHora(event: any, item: OrcamentoItem) {
    item.preco_hora = event.replace(/[^\d]/g, '') / 100;
  }

  onChangeFrete(event: any) {
    this.orcamento.frete = event.replace(/[^\d]/g, '') / 100;
  }

  onChangeDesconto(event: any) {
    this.orcamento.desconto = event.replace(/[^\d]/g, '') / 100;
  }

  calculaPeso(item: OrcamentoItem) {
    if (item.produto) {
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
            (item.largura || 0 / 1000) *
            (item.produto.peso || 0) *
            (item.quantidade || 0);
          break;
        case 'Peça':
          item.peso = (item.produto.peso || 0) * (item.quantidade || 0);
          break;
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
    }
  }

  calculaHora(item: OrcamentoItem) {
    let tempoArray: string[] = item.tempo?.split(':') || [];

    if (tempoArray.length > 0) {
      let hora: number =
        Number(tempoArray[0]) +
        Number(tempoArray[1]) / 60 +
        Number(tempoArray[2]) / 3600;

      item.total_hora =
        (hora || 0) * (item.preco_hora || 0) * (item.quantidade || 0);
    }
    this.calculaTotal(item);
  }

  calculaTotal(item: OrcamentoItem) {
    if ((item.total_manual || 0) > 0) {
      item.total = item.total_manual;
    } else {
      item.total =
        ((item.total_peso || 0) + (item.total_hora || 0)) *
        ((item.imposto || 0) + 1);
    }
    this.calculaTotais();
  }

  calculaTotais() {
    this.orcamento.total = 0;
    this.orcamento.orcamento_item.forEach((item) => {
      this.orcamento.total = (this.orcamento.total || 0) + (item.total || 0);
    });
    this.orcamento.total =
      (this.orcamento.total || 0) +
      (this.orcamento.frete || 0) -
      (this.orcamento.desconto || 0);
  }

  validaEmail(email: string) {
    let emailValidador = validador.filter(
      (validacao) => validacao.campo === 'email'
    )[0];

    return emailValidador.funcao(email);
  }

  getBackOrcamentos(){

  }

  create(){

  }

  update(){

  }

  createOrUpdate() {

  }

  delete(){

  }

  confirm() {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir este pedido de compra?',
      accept: () => {
        this.delete();
      },
    });
  }
}


