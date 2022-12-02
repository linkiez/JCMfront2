import { ListaGenericaItem } from './../../../../models/lista-generica';
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
import { ProdutoService } from 'src/app/services/produto.service';
import * as lodash from 'lodash';
import { FornecedorService } from 'src/app/services/fornecedor.service';

@Component({
  selector: 'app-pedidocompra',
  templateUrl: './pedidocompra.component.html',
  styleUrls: ['./pedidocompra.component.scss'],
  providers: [ConfirmationService],
})
export class PedidoCompraComponent implements OnInit, OnDestroy, OnChanges {
  constructor(
    private pedidoCompraService: PedidoCompraService,
    private fornecedorService: FornecedorService,
    private produtoService: ProdutoService,
    private listaGenericaService: ListaGenericaService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  pedidoCompra: PedidoCompra = {
    fornecedor: {},
    pedido_compra_items: [],
    cond_pagamento: 'AVISTA',
    frete: 0,
    status: 'Orçamento'
  };

  fornecedores: Pessoa[] = [];

  produtos: Produto[] = [];

  dimensoes$ = this.listaGenericaService
    .getByNameListaGenerica('produtoDimensoes')
    .pipe(map((listaGenerica: any) => listaGenerica.lista_generica_items));

  condicaoPagamento$ = this.listaGenericaService
    .getByNameListaGenerica('condicaoPagamento')
    .pipe(map((listaGenerica: any) => listaGenerica.lista_generica_items));

  status: string[] = [];

  observacoes: ListaGenericaItem[] = [];

  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.getPedidoCompra();
    this.getStatus()
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
            this.calculaTotal();
          },
        });
    }
  }

  getStatus() {
    this.listaGenericaService.getByNameListaGenerica('statusPedidoCompra').pipe(
      map((listaGenerica: any) => listaGenerica.lista_generica_items)
    ).subscribe({next: (response)=> {
      this.status=response}});
  }

  searchFornecedor(event: any) {
    let query: Query = {
      page: 0,
      pageCount: 10,
      searchValue: event.query,
      deleted: false,
    };

    this.subscription = this.fornecedorService
      .getFornecedores(query)
      .pipe(
        distinctUntilChanged(), // recorda a ultima pesquisa
        debounceTime(1000) // espera um tempo antes de começar
      )
      .subscribe({
        next: (fornecedores) => {
          this.fornecedores = fornecedores.fornecedores;
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

  itemPeso(event: any, item: PedidoCompraItem) {
    item.peso = event.replace(',','.');
  }

  itemIpi(event: any, item: PedidoCompraItem) {
    item.ipi = event.replace(/[^\d]/g, '') / 10000;
  }

  frete(event: any) {
    this.pedidoCompra.frete = event.replace(/[^\d]/g, '') / 100;
  }

  calculaTotal() {
    let total = 0;
    this.pedidoCompra.pedido_compra_items =
      this.pedidoCompra.pedido_compra_items.map((item: PedidoCompraItem) => {
        item.total =
          (item.peso || 0) * (item.preco || 0) * ((Number(item.ipi) || 0) + 1);
        total = total + item.total;
        return item;
      });

    total = total + (Number(this.pedidoCompra.frete) || 0);
    this.pedidoCompra.total = total;
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

  getBackPedidos() {
    this.router.navigate(['/home/pedidoscompras']);
  }

  confirm() {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir este pedido de compra?',
      accept: () => {
        this.deletePedido();
      },
    });
  }

  deletePedido() {
    this.pedidoCompraService
      .deletePedidoCompra(this.pedidoCompra)
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
            detail: 'O pedido de compra foi exluido.',
          });
          this.router.navigate(['/home/pedidoscompras']);
        },
      });
  }

  createOrUpdate() {
    if (this.pedidoCompra.id == undefined) {
      this.createPedido();
    } else {
      this.updatePedido();
    }
  }
  createPedido() {
    this.pedidoCompraService
      .addPedidoCompra(this.pedidoCompra)
      .pipe(debounceTime(1000))
      .subscribe({
        next: (response) => {
          this.pedidoCompra = response;
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
            detail: 'O pedido foi criado.',
          });
          this.router.navigate([
            `/home/pedidoscompras/${this.pedidoCompra.id}`,
          ]);
        },
      });
  }
  updatePedido() {
    this.pedidoCompraService
      .updatePedidoCompra(this.pedidoCompra)
      .pipe(debounceTime(1000))
      .subscribe({
        next: (response) => {
          // this.pedidoCompra = response;
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
            detail: 'O pedido foi atualizado.',
          });
        },
      });
  }

  newItem() {
    this.pedidoCompra.pedido_compra_items.push({ produto: {} });
  }

  removeItem(index: number) {
    this.pedidoCompra.pedido_compra_items.splice(index, 1);
  }
}
