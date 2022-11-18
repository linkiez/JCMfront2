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

  query: Query = {
    page: 0,
    pageCount: 10,
    searchValue: '',
    deleted: false,
  };

  private subscription: Subscription = new Subscription();


  constructor(
    private produtoService: ProdutoService,
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getProdutos();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getProdutos(pageChange?: boolean): void {
    this.query.page = pageChange ? this.query.page : 0

    this.subscription = this.produtoService
      .getProdutos(this.query)
      .pipe(
        debounceTime(1000), // espera um tempo antes de começar
        distinctUntilChanged() // recorda a ultima pesquisa
      )
      .subscribe({
        next: (consulta) => {
          this.produtos = consulta.produtos
          this.totalRecords = consulta.totalRecords;
          this.paginator.changePage(this.query.page)
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
    this.query.page = event.page;
    this.query.pageCount = event.rows;
    this.getProdutos(true);
  }

  clickDeleted(id: number) {
    if (!this.query.deleted) {
      this.router.navigate([`home/produtos/${id}`]);
    }else{
      this.confirm(id)
    }
  }

  confirm(id: number) {
    this.confirmationService.confirm({
        message: 'Deseja restaurar esse produto?',
        accept: () => {
            this.produtoService.restoreProduto(id).subscribe(
              {
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
            }
        }
    )}
    });
  }

  search() {
    if (
      this.query.searchValue?.length! > 2 ||
      this.query.searchValue?.length! === 0
    )
      this.getProdutos();
  }
}
