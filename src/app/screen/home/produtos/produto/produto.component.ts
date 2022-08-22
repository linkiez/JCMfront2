import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Produto } from '../../../../models/produto';
import { ProdutoService } from '../../../../services/produto.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { map, Subscription, tap } from 'rxjs';
import { ListaGenericaService } from '../../../../services/lista-generica.service';

const API = environment.backendURL;

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss'],
  providers: [ConfirmationService],
})
export class ProdutoComponent implements OnInit, OnDestroy {
  constructor(
    private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private listaGenericaService: ListaGenericaService
  ) {}

  produto: Produto = {};

  categorias$ = this.listaGenericaService.getByNameListaGenerica('categoriaProduto').pipe(map((listaGenerica: any)=> listaGenerica.lista_generica_items))

  private subscription: Subscription = new Subscription;

  ngOnInit(): void {
    this.getProduto();
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  getProduto() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id != 0) {
      this.subscription = this.produtoService.getProduto(id).subscribe({
        next: (produto) => {
          this.produto = produto;
        },
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
  }

  updateProduto() {
    this.produtoService.updateProduto(this.produto).subscribe({
      error: (error) => {
        console.log(error)
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: error.message,
        })
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

  createProduto(){
    this.produtoService.addProduto(this.produto).subscribe({
      next: (produto) => this.produto=produto,
      error: (error) => {
        console.log(error)
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: error.message,
        })
      },
      complete: () =>
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'O produto foi criado.',
        }),
    });
  }

  createOrUpdate(){
    if(this.produto.id == undefined){
      this.createProduto()
    }else{
      this.updateProduto()
    }
  }

  deleteProduto() {
    this.produtoService.deleteProduto(this.produto).subscribe(
      {
        error: (error) => {
          console.log(error)
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: error.message,
          })
        },
        complete: () =>
          {this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'O produto foi excluido.',
          })
          this.router.navigate(['/home/produtos']);
        },
      }
    );

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
