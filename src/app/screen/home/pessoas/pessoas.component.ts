import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { debounceTime, distinctUntilChanged, filter, Subscription } from 'rxjs';
import { Pessoa } from 'src/app/models/pessoa';
import { Query } from 'src/app/models/query';
import { PessoaService } from 'src/app/services/pessoa.service';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.scss'],
})
export class PessoasComponent implements OnInit, OnDestroy {
  @ViewChild('dt') dt: Table | undefined;

  pessoas: Array<Pessoa> = [];

  totalRecords: number = 0;

  query: Query = {
    page: 0,
    pageCount: 10,
    searchValue: '',
    fornecedor: false,
    operador: false,
    vendedor: false
  };

  private subscription: Subscription = new Subscription();

  cols: any[] = [];

  _selectedColumns: any[] = [];

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPessoas();

    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'nome', header: 'Nome' },
      { field: 'razao_social', header: 'Razão Social' },
      { field: 'cnpj_cpf', header: 'CNPJ / CPF' },
      { field: 'telefone', header: 'Telefone' },
      { field: 'email', header: 'Email' },
      { field: 'municipio', header: 'Cidade' },
      { field: 'createdAt', header: 'Criado em' },
      { field: 'updatedAt', header: 'Atualizado em' },
    ];

    this._selectedColumns = [
      { field: 'id', header: 'Id' },
      { field: 'nome', header: 'Nome' },
      { field: 'cnpj_cpf', header: 'CNPJ / CPF' },
      { field: 'email', header: 'Email' },
      { field: 'telefone', header: 'Telefone' },
      { field: 'updatedAt', header: 'Atualizado em' },
    ];
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getPessoas(): void {
    this.subscription = this.pessoaService
      .getPessoas(this.query)
      .pipe(
        debounceTime(1000), // espera um tempo antes de começar
        distinctUntilChanged() // recorda a ultima pesquisa
      )
      .subscribe({
        next: (consulta) => {
          this.pessoas = consulta.pessoas;
          this.totalRecords = consulta.totalRecords;
        },
        error: (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: error.message,
          });
        },
      });
  }

  search(){
    if(this.query.searchValue?.length! > 3 || this.query.searchValue?.length! === 0) this.getPessoas()
  }

  new() {
    this.router.navigate(['/home/pessoas/0']);
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
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
    this.getPessoas();
  }
}
