import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription, map } from 'rxjs';
import { Contato } from 'src/app/models/contato';
import { ContatoService } from 'src/app/services/contato.service';
import { ListaGenericaService } from 'src/app/services/lista-generica.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.scss'],
  providers: [ConfirmationService],
})
export class ContatoComponent implements OnInit, OnDestroy {

  contatoCategorias$ = this.listaGenericaService
    .getByNameListaGenerica('categoriaContato')
    .pipe(map((listaGenerica: any) => listaGenerica.lista_generica_items));

  constructor(
    private contatoService: ContatoService,
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private listaGenericaService: ListaGenericaService
  ) { }

  contato: Contato = {};

  private subscription: Subscription = new Subscription;

  ngOnInit(): void {
    this.getContato();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getContato() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id != 0) {
      this.subscription = this.contatoService.getContato(id).subscribe({
        next: (contato) => {
          this.contato = contato;
        },
        error: (error) => {
          console.log(error)
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Não foi possível carregar o contato. - ' + error.error,
          })
        },
      });
    }
  }

  updateContato() {
    this.contatoService.updateContato(this.contato).subscribe({
      error: (error) => {
        console.log(error)
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível atualizar o contato. - ' + error.error,
        })
      },
      complete: () =>
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'O contato foi atualizado.',
        }),
    });
  }

  createContato(){
    this.contatoService.addContato(this.contato).subscribe({
      next: (contato) => this.contato=this.contato,
      error: (error) => {
        console.log(error)
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível criar o contato. - ' + error.error,
        })
      },
      complete: () =>
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'O contato foi criado.',
        }),
    });
  }

  createOrUpdate(){
    if(this.contato.id == undefined){
      this.createContato()
    }else{
      this.updateContato()
    }
  }

  deleteContato() {
    this.contatoService.deleteContato(this.contato).subscribe({
      error: (error) => {
        console.error(error)
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível excluir o contato. - ' + error.error,
        })
      }
    });
    this.router.navigate(['/home/contatos']);
  }

  confirm() {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir este contato?',
      accept: () => {
        this.deleteContato();
      },
    });
  }

  getBackContatos() {
    this.router.navigate(['/home/contatos']);
  }

  onChangeValor(event: any) {
    this.contato.valor = event.replace(/[^\d]/g, '');
  }

}
