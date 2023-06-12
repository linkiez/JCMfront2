import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Produto } from '../../../models/produto';
import { ProdutoService } from '../../../services/produto.service';
import { ConfirmationService } from 'primeng/api';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Query } from 'src/app/models/query';
import { Paginator } from 'primeng/paginator';
import { QueryService } from 'src/app/services/query.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss'],
  providers: [ConfirmationService],
})
export class ProdutosComponent implements OnInit, OnDestroy {
  @ViewChild('paginator') paginator!: Paginator;

  produtos: Array<Produto> = [];

  totalRecords: number = 0;

  first = 0;

  private subscription: Subscription = new Subscription();

  constructor(
    private produtoService: ProdutoService,
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService,
    public queryService: QueryService
  ) {}

  ngOnInit(): void {
    this.getProdutos(true);
    this.first = this.queryService.produtos.page * this.queryService.produtos.pageCount;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getProdutos(pageChange?: boolean): void {
    this.queryService.produtos.page = pageChange ? this.queryService.produtos.page : 0;

    this.subscription = this.produtoService
      .getProdutos(this.queryService.produtos)
      // .pipe(
      //   debounceTime(1000), // espera um tempo antes de começar
      //   distinctUntilChanged() // recorda a ultima pesquisa
      // )
      .subscribe({
        next: (consulta) => {
          this.produtos = consulta.produtos.map((produto: any) => {
            if (produto.pedido_compra_items[0]) {
              produto.preco = produto.pedido_compra_items[0].precoComIpi;
              produto.atualizacao = produto.pedido_compra_items[0].pedido_compra.data_emissao;
            } else {
              produto.preco = 0;
              produto.atualizacao = '-'
            }
            return produto;
          });

          this.totalRecords = consulta.totalRecords;
          if (!pageChange) this.paginator.changePageToFirst(new Event(''));
          // console.log(this.produtos);
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

  new() {
    this.router.navigate(['/home/produtos/0']);
  }

  pageChange(event: any) {
    this.queryService.produtos.page = event.page;
    this.queryService.produtos.pageCount = event.rows;
    this.getProdutos(true);
  }

  clickDeleted(id: number) {
    if (!this.queryService.produtos.deleted) {
      this.router.navigate([`home/produtos/${id}`]);
    } else {
      this.confirm(id);
    }
  }

  confirm(id: number) {
    this.confirmationService.confirm({
      message: 'Deseja restaurar esse produto?',
      accept: () => {
        this.produtoService.restoreProduto(id).subscribe({
          error: (error: any) => {
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
              detail: 'O produto foi restaurado.',
            });
            this.getProdutos();
          },
        });
      },
    });
  }

  search() {
    if (
      this.queryService.produtos.searchValue?.length! > 2 ||
      this.queryService.produtos.searchValue?.length! === 0
    )
      this.getProdutos();
  }
}
