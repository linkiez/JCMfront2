import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduto } from '../../../../models/produto';
import { ProdutoService } from '../../../../services/produto.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { map, Subscription, tap } from 'rxjs';
import { ListaGenericaService } from '../../../../services/lista-generica.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css'],
  providers: [ConfirmationService],
})
export class ProdutoComponent implements OnInit {
  constructor(
    private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private listaGenericaService: ListaGenericaService
  ) {}

  produto: IProduto = { files: [] };

  categorias$ = this.listaGenericaService
    .getByNameListaGenerica('categoriaProduto')
    .pipe(map((listaGenerica: any) => listaGenerica.lista_generica_items));

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
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Não foi possível carregar o produto. - ' + error.error,
          });
        },
      });
    }
  }

  updateProduto() {
    this.produtoService.updateProduto(this.produto).subscribe({
      error: (error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível atualizar o produto. - ' + error.error,
        });
      },
      complete: () =>
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'O produto foi atualizado.',
        }),
    });
    //this.router.navigate(['/home/produtos']);
  }

  createProduto() {
    this.produtoService.addProduto(this.produto).subscribe({
      next: (produto) => (this.produto = produto),
      error: (error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível criar o produto. - ' + error.error,
        });
      },
      complete: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'O produto foi criado.',
        });
        this.router.navigate([`/home/produtos/${this.produto.id}`]);
      },
    });
  }

  createOrUpdate() {
    if (Number(this.route.snapshot.paramMap.get('id')) == 0) {
      this.createProduto();
    } else {
      this.updateProduto();
    }
  }

  deleteProduto() {
    this.produtoService.deleteProduto(this.produto).subscribe({
      error: (error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível excluir o produto. - ' + error.error,
        });
      },
      complete: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'O produto foi excluido.',
        });
        this.router.navigate(['/home/produtos']);
      },
    });
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
    window.history.back();
  }

  toNumber(event: any): number {
    return Number(event.replace(',', '.'));
  }

  goTo(id: number) {
    this.router.navigate(['/home/pedidoscompras/' + id]);
  }

  onChangeNumber(event: any) {
    return Number(event.replace(/[^\d]/g, '')) / 100;
  }
}
