import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Contato } from 'src/app/models/contato';
import { ContatoService } from 'src/app/services/contato.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.scss'],
  providers: [ConfirmationService],
})
export class ContatoComponent implements OnInit, OnDestroy {

  constructor(
    private contatoService: ContatoService,
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) { }

  contato: Contato = {};

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
      this.subscription = this.contatoService.getProduto(id).subscribe({
        next: (contato) => {
          console.log(contato)
          this.contato = contato;
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
    this.contatoService.updateProduto(this.contato).subscribe({
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
    this.contatoService.addProduto(this.contato).subscribe({
      next: (contato) => this.contato=this.contato,
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
    if(this.contato.id == undefined){
      this.createProduto()
    }else{
      this.updateProduto()
    }
  }

  deleteProduto() {
    this.contatoService.deleteProduto(this.contato).subscribe();
    this.router.navigate(['/home/contatos']);
  }

  confirm() {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir este contato?',
      accept: () => {
        this.deleteProduto();
      },
    });
  }

  getBackProdutos() {
    this.router.navigate(['/home/contatos']);
  }

}
