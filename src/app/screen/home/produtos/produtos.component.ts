import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { IProduto } from '../../../models/produto';
import { ProdutoService } from '../../../services/produto.service';
import { ConfirmationService } from 'primeng/api';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { IQuery } from 'src/app/models/query';
import { Paginator } from 'primeng/paginator';
import { QueryService } from 'src/app/services/query.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css'],
  providers: [ConfirmationService],
})
export class ProdutosComponent implements OnInit {
  @ViewChild('paginator') paginator!: Paginator;

  produtos: Array<IProduto> = [];

  totalRecords: number = 0;

  first = 0;

  constructor(
    private produtoService: ProdutoService,
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService,
    public queryService: QueryService
  ) {}

  ngOnInit(): void {
    this.getProdutos(true);
    this.first =
      this.queryService.produtos.page * this.queryService.produtos.pageCount;
  }

  getProdutos(pageChange?: boolean): void {
    this.queryService.produtos.page = pageChange
      ? this.queryService.produtos.page
      : 0;

    this.produtoService.getProdutos(this.queryService.produtos).subscribe({
      next: (consulta) => {
        this.produtos = consulta.produtos.map((produto: any) => {
          if (produto.pedido_compra_items[0]) {
            produto.preco = produto.pedido_compra_items[0].precoComIpi;
            produto.atualizacao =
              produto.pedido_compra_items[0].pedido_compra.data_emissao;
          } else {
            produto.preco = 0;
            produto.atualizacao = '-';
          }
          return produto;
        });

        this.totalRecords = consulta.totalRecords;
        if (!pageChange) this.paginator.changePageToFirst(new Event(''));
      },
      error: (error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao carregar os produtos. - ' + error.error.message,
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
            console.error(error);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao restaurar o produto. - ' + error.error.message,
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
