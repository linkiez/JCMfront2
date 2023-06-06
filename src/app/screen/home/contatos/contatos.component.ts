import { Component, OnInit, ViewChild } from '@angular/core';
import { Contato } from '../../../models/contato';
import { ContatoService } from '../../../services/contato.service';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { Query } from 'src/app/models/query';

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.scss'],
})
export class ContatosComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;

  contatos: Array<Contato> = [];

  query: Query = {
    page: 0,
    pageCount: 25,
    searchValue: '',
    deleted: false,
  };

  totalRecords: number = 0;

  constructor(private contatoService: ContatoService, private router: Router) {}

  ngOnInit(): void {
    this.getContatos();
  }

  getContatos(pageChange?: boolean): void {
    this.query.page = pageChange ? this.query.page : 0;
    this.contatoService.getContatos(this.query).subscribe({
      next: (response) => {
        this.contatos = response.contatos;
        this.totalRecords = response.totalRecords;
      },
      error: (error) => console.log(error),
    });
  }

  pageChange(event: any) {
    if (event) {
      this.query.page = event.page;
      this.query.pageCount = event.rows;
      this.getContatos(true);
    }
  }

  new() {
    this.router.navigate(['/home/contatos/0']);
  }
}
