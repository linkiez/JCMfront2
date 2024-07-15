import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription, map } from 'rxjs';
import { IContato } from 'src/app/models/contato';
import { ContatoService } from 'src/app/services/contato.service';
import { ListaGenericaService } from 'src/app/services/lista-generica.service';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css'],
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
    private listaGenericaService: ListaGenericaService,
    private dialogService: DialogService,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) {}

  contato: IContato = {};

  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.getContato();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getContato() {
    let id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) id = this.config.data?.contato?.id || 0;
    console.log('id', id);
    console.log('this.config.data', this.config.data);
    if (id != 0) {
      this.subscription = this.contatoService.getContato(id).subscribe({
        next: (contato) => {
          this.contato = contato;
        },
        error: (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail:
              'Não foi possível carregar o contato. - ' + error.error.message,
          });
        },
      });
    }
  }

  updateContato() {
    this.contatoService.updateContato(this.contato).subscribe({
      error: (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail:
            'Não foi possível atualizar o contato. - ' + error.error.message,
        });
      },
      complete: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'O contato foi atualizado.',
        });
        this.getBackContatos();
      },
    });
  }

  createContato() {
    this.contatoService.addContato(this.contato).subscribe({
      next: (contato) => (this.contato = this.contato),
      error: (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível criar o contato. - ' + error.error.message,
        });
      },
      complete: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'O contato foi criado.',
        });
        this.getBackContatos(true);
      },
    });
  }

  createOrUpdate() {
    if (this.contato.id == undefined) {
      this.createContato();
    } else {
      this.updateContato();
    }
  }

  deleteContato() {
    this.contatoService.deleteContato(this.contato).subscribe({
      error: (error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail:
            'Não foi possível excluir o contato. - ' + error.error.message,
        });
      },
    });
    this.getBackContatos();
  }

  confirm() {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir este contato?',
      accept: () => {
        this.deleteContato();
      },
    });
  }

  getBackContatos(created = false) {
    if (this.config.data) {
      this.ref.close(this.contato);
    } else {
      if (created) {
        this.router.navigate(['/contatos']);
      } else {
        this.router.navigate([`/home/contatos/${this.contato.id}`]);
      }
    }
  }

  onChangeValor(event: any) {
    this.contato.valor = event.replace(/[^\d]/g, '');
  }
}
