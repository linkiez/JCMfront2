import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { debounceTime, distinctUntilChanged, filter, Subscription } from 'rxjs';
import { Pessoa } from 'src/app/models/pessoa';
import { Query } from 'src/app/models/query';
import { PessoaService } from 'src/app/services/pessoa.service';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.scss'],
  providers: [ConfirmationService],
})
export class PessoasComponent implements OnInit, OnDestroy {
  @ViewChild('paginator') paginator!: Paginator;

  pessoas: Array<Pessoa> = [];

  totalRecords: number = 0;

  query: Query = {
    page: 0,
    pageCount: 10,
    searchValue: '',
    fornecedor: false,
    operador: false,
    vendedor: false,
    deleted: false,
  };

  private subscription: Subscription = new Subscription();

  cols: any[] = [];

  _selectedColumns: any[] = [];

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getPessoas();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getPessoas(pageChange?: boolean): void {
    this.query.page = pageChange ? this.query.page : 0

    this.subscription = this.pessoaService
      .getPessoas(this.query)
      // .pipe(
      //   debounceTime(1000), // espera um tempo antes de começar
      //   distinctUntilChanged() // recorda a ultima pesquisa
      // )
      .subscribe({
        next: (consulta) => {
          this.pessoas = consulta.pessoas;
          this.totalRecords = consulta.totalRecords;
          if (!pageChange) this.paginator.changePageToFirst(new Event(""));
        },
        error: (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: error.message,
          });
        }
      });
  }

  search() {
    if (
      this.query.searchValue?.length! > 3 ||
      this.query.searchValue?.length! === 0
    )
      this.getPessoas();
  }

  new() {
    this.router.navigate(['/home/pessoas/0']);
  }

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this.cols.filter((col) => val.includes(col));
  }

  pageChange(event: any) {
    this.query.page = event.page;
    this.query.pageCount = event.rows;
    this.getPessoas(true);
  }

  clickDeleted(id: number) {
    if (!this.query.deleted) {
      this.router.navigate([`home/pessoas/${id}`]);
    }else{
      this.confirm(id)
    }
  }

  confirm(id: number) {
    this.confirmationService.confirm({
        message: 'Deseja restaurar essa pessoa?',
        accept: () => {
            this.pessoaService.restorePessoa(id).subscribe(
              {next: (pessoa) => {

              },
            error: (error) => {
              console.log(error);
              this.messageService.add({
                severity: 'error',
                summary: 'Erro',
                detail: error.message,
              });
            },
            complete: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'A pessoa foi restaurada.',
              });
              this.getPessoas();
            }
        }
    )}
    });
  }

  isBeforeToday(date: string | Date) {
    date = new Date(date)
    if(!date) return false
    const today = new Date();
    return date < today;
  }

  isAfterToday(date: string | Date) {
    date = new Date(date)
    if(!date) return false
    const today = new Date();
    return date > today;
  }

}

