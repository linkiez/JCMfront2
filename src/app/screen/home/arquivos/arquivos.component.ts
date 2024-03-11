import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { map, Subscription } from 'rxjs';
import { Arquivo } from '../../../models/arquivo';
import { ArquivoService } from '../../../services/arquivo.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-arquivos',
  templateUrl: './arquivos.component.html',
  styleUrls: ['./arquivos.component.css'],
  providers: [ConfirmationService],
})
export class ArquivosComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;

  arquivos: Arquivo[] = [];

  first = 0;

  rows = 10;

  private subscription: Subscription = new Subscription();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private arquivoService: ArquivoService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getArquivos();
  }

  getArquivos(): void {
    this.subscription = this.arquivoService.getArquivos().subscribe({
      next: (arquivos) => (this.arquivos = arquivos),
      error: (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao carregar arquivos. - '+error.error,
        });
      },
    });
  }

  deleteArquivo(id : number){
    this.subscription = this.arquivoService.deleteArquivo(id).subscribe({
      error: (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao apagar arquivo. - '+error.error,
        });
      },
      complete: () => {
        this.getArquivos();
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: "Arquivo apagado.",
        });
      }
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
    return this.arquivos
      ? this.first === this.arquivos.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.arquivos ? this.first === 0 : true;
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  clear(table: Table) {
    table.clear();
  }

  goToUrl(id: number): void {
    this.arquivoService.getUrlArquivo(id).subscribe({
      next: (url: any) => {
        console.log(url);
        this.document.location.href = url.url
      },
    });
  }

  confirm(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target || undefined,
      message: "Tem certeza que deseja apagar o arquivo?",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.deleteArquivo(id);
      }
    });
  }
}
