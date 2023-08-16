import { Component, OnInit, ViewChild } from '@angular/core';
import { Contato } from '../../../models/contato';
import { ContatoService } from '../../../services/contato.service';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { Query } from 'src/app/models/query';
import { QueryService } from 'src/app/services/query.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.scss'],
})
export class ContatosComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;

  contatos: Array<Contato> = [];

  first = 0;

  totalRecords: number = 0;

  constructor(
    private contatoService: ContatoService,
    private router: Router,
    public queryService: QueryService,
    private messageSerivice: MessageService
  ) {}

  ngOnInit(): void {
    this.getContatos(true);
    this.first =
      this.queryService.contatos.page * this.queryService.contatos.pageCount;
  }

  getContatos(pageChange?: boolean): void {
    this.queryService.contatos.page = pageChange
      ? this.queryService.contatos.page
      : 0;
    this.contatoService.getContatos(this.queryService.contatos).subscribe({
      next: (response) => {
        this.contatos = response.contatos;
        this.totalRecords = response.totalRecords;
      },
      error: (error) => {
        console.log(error);
        this.messageSerivice.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao carregar contatos - ' + error.error,
        });
      },
    });
  }

  pageChange(event: any) {
    if (event) {
      this.queryService.contatos.page = event.page;
      this.queryService.contatos.pageCount = event.rows;
      this.getContatos(true);
    }
  }

  new() {
    this.router.navigate(['/home/contatos/0']);
  }
}
