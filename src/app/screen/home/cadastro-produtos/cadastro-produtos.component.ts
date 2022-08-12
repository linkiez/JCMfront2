import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Produto } from './produto';
import { ProdutoService } from './produto.service';

@Component({
  selector: 'app-cadastro-produtos',
  templateUrl: './cadastro-produtos.component.html',
  styleUrls: ['./cadastro-produtos.component.scss']
})
export class CadastroProdutosComponent implements OnInit {

  produtos: Array<Produto> = []

  constructor(private produtoService: ProdutoService) { }

  ngOnInit(): void {
    this.getProdutos();
  }

  getProdutos(): void {
    this.produtoService
      .getProdutos()
      .subscribe((produtos) => (this.produtos = produtos), (error) => console.log(error));
  }


}
