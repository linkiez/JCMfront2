import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Produto } from '../produto';
import { ProdutoService } from '../produto.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

const API = environment.backendURL;

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss'],
  providers: [ConfirmationService],
})
export class ProdutoComponent implements OnInit {
  constructor(
    private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  produto: Produto = {};

  ngOnInit(): void {
    this.getProduto();
  }

  getProduto() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id != 0) {
      this.produtoService.getProduto(id).subscribe({
        next: (produto) => {
          this.produto = produto;
        },
        error: (error) => console.log(error),
      });
    }
  }

  updateProduto() {
    this.produtoService.updateProduto(this.produto).subscribe({
      complete: () =>
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'O produto foi atualizado.',
        }),
    });
    //this.router.navigate(['/home/produtos']);
  }

  deleteProduto() {
    this.produtoService.deleteProduto(this.produto).subscribe();
    this.router.navigate(['/home/produtos']);
  }

  confirm() {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir este produto?',
      accept: () => {
        this.deleteProduto();
      },
    });
  }

  getBackProdutos() {
    this.router.navigate(['/home/produtos']);
  }
}
