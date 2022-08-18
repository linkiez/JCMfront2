import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Produto } from '../produto';
import { ProdutoService } from '../produto.service';

const API = environment.backendURL;

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {

  constructor(private produtoService: ProdutoService, private route: ActivatedRoute, private router: Router) { }

  produto: Produto = {}

  ngOnInit(): void {
    this.getProduto()
  }

  getProduto() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if(id != 0){
      this.produtoService.getProduto(id).subscribe(
        (produto) => {this.produto = produto
      },
        (error) => console.log(error)
      )
    }
  }

  updateProduto() {
    this.produtoService.updateProduto(this.produto).subscribe()
    this.router.navigate(["/home/produtos"]);
  }

  deleteProduto() {
    this.produtoService.deleteProduto(this.produto).subscribe()
    this.router.navigate(["/home/produtos"]);
  }

  getBackProdutos() {
    this.router.navigate(["/home/produtos"]);
  }

}
