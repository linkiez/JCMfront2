import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { debounceTime, distinctUntilChanged, map, Subscription } from 'rxjs';
import { Fornecedor } from 'src/app/models/fornecedor';
import { PedidoCompra, PedidoCompraItem } from 'src/app/models/pedido-compra';
import { Pessoa } from 'src/app/models/pessoa';
import { Produto } from 'src/app/models/produto';
import { Query } from 'src/app/models/query';
import { ListaGenericaService } from 'src/app/services/lista-generica.service';
import { PedidoCompraService } from 'src/app/services/pedidocompra.service';
import { PessoaService } from 'src/app/services/pessoa.service';
import { ProdutoService } from 'src/app/services/produto.service';
import * as lodash from 'lodash';

@Component({
  selector: 'app-pedidocompra',
  templateUrl: './pedidocompra.component.html',
  styleUrls: ['./pedidocompra.component.scss'],
  providers: [ConfirmationService],
})
export class PedidoCompraComponent implements OnInit, OnDestroy, OnChanges {
  constructor(
    private pedidoCompraService: PedidoCompraService,
    private pessoaService: PessoaService,
    private produtoService: ProdutoService,
    private listaGenericaService: ListaGenericaService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  pedidoCompra: PedidoCompra = { fornecedor: {}, pedido_compra_items: [] };

  fornecedores: Pessoa[] = [];

  produtos: Produto[] = [];

  dimensoes$ = this.listaGenericaService
    .getByNameListaGenerica('produtoDimensoes')
    .pipe(map((listaGenerica: any) => listaGenerica.lista_generica_items));

  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.getPedidoCompra();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnChanges() {}

  getPedidoCompra() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id != 0) {
      this.subscription = this.pedidoCompraService
        .getPedidoCompra(id)
        .pipe(debounceTime(1000))
        .subscribe({
          next: (pedido) => {
            pedido.pedido_compra_items = pedido.pedido_compra_items.map(
              (item) => {
                item.prazo = item.prazo ? new Date(item.prazo) : undefined;
                return item;
              }
            );
            this.pedidoCompra = pedido;
            this.calculaTotal();
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

  searchFornecedor(event: any) {
    let query: Query = {
      page: 0,
      pageCount: 10,
      searchValue: event.query,
      fornecedor: true,
      deleted: false,
    };

    this.subscription = this.pessoaService
      .getPessoas(query)
      .pipe(
        distinctUntilChanged(), // recorda a ultima pesquisa
        debounceTime(1000) // espera um tempo antes de começar
      )
      .subscribe({
        next: (fornecedores) => {
          this.fornecedores = fornecedores.pessoas;
        },
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

  itemPreco(event: any, item: PedidoCompraItem) {
    item.preco = event.replace(/[^\d]/g, '') / 100;
  }

  itemIpi(event: any, item: PedidoCompraItem) {
    item.ipi = event.replace(/[^\d]/g, '') / 10000;
  }

  calculaTotal() {
    this.pedidoCompra.pedido_compra_items =
      this.pedidoCompra.pedido_compra_items.map((item: PedidoCompraItem) => {
        item.total =
          (item.peso || 0) * (item.preco || 0) * ((item.ipi || 0) + 1);
        return item;
      });
  }

  calculaPeso(item: PedidoCompraItem) {
    let dimensao: any = (item.dimensao || '')
      .split('x')
      .map((dimensao: string | number) => {
        dimensao = Number(dimensao.toString().replace(/[^\d]/g, '')) / 1000;
        return lodash.isNumber(dimensao) ? dimensao : 0;
      });
    if (item.produto?.categoria == 'Chapa') {
      item.peso =
        (dimensao[0] || 1) *
        (dimensao[1] || 0) *
        (item.produto?.peso || 0) *
        (item.produto.espessura || 0) *
        (item.quantidade || 0);
    }
    if (item.produto?.categoria == 'Barra') {
      item.peso =
        (dimensao[0] || 1) *
        (item.produto?.peso || 0) *
        (item.produto.espessura || 0) *
        (item.quantidade || 0);
    }
    if (item.produto?.categoria == 'Peça') {
      item.peso =
        (dimensao[0] || 1) * (item.produto?.peso || 0) * (item.quantidade || 0);
    }
    this.calculaTotal();
  }
}
