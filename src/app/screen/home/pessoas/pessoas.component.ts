import { QueryService } from 'src/app/services/query.service';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { debounceTime, distinctUntilChanged, filter, Subscription } from 'rxjs';
import { IPessoa } from 'src/app/models/pessoa';
import { IQuery } from 'src/app/models/query';
import { PessoaService } from 'src/app/services/pessoa.service';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css'],
  providers: [ConfirmationService],
})
export class PessoasComponent implements OnInit {
  @ViewChild('paginator') paginator!: Paginator;

  pessoas: Array<IPessoa> = [];

  totalRecords: number = 0;

  first = 0;

  cols: any[] = [];

  _selectedColumns: any[] = [];

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService,
    public queryService: QueryService
  ) {}

  ngOnInit(): void {
    this.getPessoas(true);
    this.first =
      this.queryService.pessoas.page * this.queryService.pessoas.pageCount;
  }

  getPessoas(pageChange?: boolean): void {
    this.queryService.pessoas.page = pageChange
      ? this.queryService.pessoas.page
      : 0;

    this.pessoaService.getPessoas(this.queryService.pessoas).subscribe({
      next: (consulta) => {
        this.pessoas = consulta.pessoas;
        this.totalRecords = consulta.totalRecords;
        if (!pageChange) this.paginator.changePageToFirst(new Event(''));
      },
      error: (error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao carregar pessoas. - ' + error.error.message,
        });
      },
    });
  }

  search() {
    if (
      this.queryService.pessoas.searchValue?.length! > 3 ||
      this.queryService.pessoas.searchValue?.length! === 0
    )
      this.getPessoas();
  }

  new() {
    this.router.navigate(['/home/pessoas/0']);
  }

  pageChange(event: any) {
    this.queryService.pessoas.page = event.page;
    this.queryService.pessoas.pageCount = event.rows;
    this.getPessoas(true);
  }

  clickDeleted(id: number) {
    if (!this.queryService.pessoas.deleted) {
      this.router.navigate([`home/pessoas/${id}`]);
    } else {
      this.confirm(id);
    }
  }

  confirm(id: number) {
    this.confirmationService.confirm({
      message: 'Deseja restaurar essa pessoa?',
      accept: () => {
        this.pessoaService.restorePessoa(id).subscribe({
          error: (error) => {
            console.error(error);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao restaurar pessoa. - ' + error.error.message,
            });
          },
          complete: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'A pessoa foi restaurada.',
            });
            this.getPessoas();
          },
        });
      },
    });
  }

  isBeforeToday(date: string | Date) {
    date = new Date(date);
    if (!date) return false;
    const today = new Date();
    return date < today;
  }

  isAfterToday(date: string | Date) {
    date = new Date(date);
    if (!date) return false;
    const today = new Date();
    return date > today;
  }
}
