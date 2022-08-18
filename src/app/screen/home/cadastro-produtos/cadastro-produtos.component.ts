import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Produto } from './produto';
import { ProdutoService } from './produto.service';
import {ConfirmationService} from 'primeng/api';


@Component({
  selector: 'app-cadastro-produtos',
  templateUrl: './cadastro-produtos.component.html',
  styleUrls: ['./cadastro-produtos.component.scss'],
  providers: [ConfirmationService]
})
export class CadastroProdutosComponent implements OnInit {

  @ViewChild('dt') dt: Table | undefined;

  produtos: Array<Produto> = []

  first = 0;

  rows = 10;

  constructor(private produtoService: ProdutoService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getProdutos();
  }

  getProdutos(): void {
    this.produtoService
      .getProdutos()
      .subscribe((produtos) => (this.produtos = produtos), (error) => console.log(error));
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
