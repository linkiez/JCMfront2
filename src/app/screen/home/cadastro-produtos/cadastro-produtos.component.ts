import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Produto } from './produto';
import { ProdutoService } from './produto.service';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cadastro-produtos',
  templateUrl: './cadastro-produtos.component.html',
  styleUrls: ['./cadastro-produtos.component.scss'],
  providers: [ConfirmationService],
})
export class CadastroProdutosComponent implements OnInit, OnDestroy {
  @ViewChild('dt') dt: Table | undefined;

  produtos: Array<Produto> = [];

  first = 0;

  rows = 10;

  private subscription: Subscription = new Subscription;

  constructor(
    private produtoService: ProdutoService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getProdutos();
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe()
  }

  getProdutos(): void {
    this.subscription = this.produtoService
      .getProdutos()
      .subscribe({
        next: (produtos) => (this.produtos = produtos),
        error: (error) => {
          console.log(error)
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: error.message,
          })
        },
      });
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.produtos
      ? this.first === this.produtos.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.produtos ? this.first === 0 : true;
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  clear(table: Table) {
    table.clear();
  }
}
