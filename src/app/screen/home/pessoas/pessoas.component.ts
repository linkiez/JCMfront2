import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { Pessoa } from 'src/app/models/pessoa';
import { PessoaService } from 'src/app/services/pessoa.service';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.scss'],
})
export class PessoasComponent implements OnInit, OnDestroy {
  @ViewChild('dt') dt: Table | undefined;

  pessoas: Array<Pessoa> = [];

  first = 0;

  rows = 10;

  private subscription: Subscription = new Subscription();

  cols: any[] = [];

  _selectedColumns: any[] = [];

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPessoas()

    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'nome', header: 'Nome' },
      { field: 'razao_social', header: 'Razão Social' },
      { field: 'cnpj_cpf', header: 'CNPJ / CPF' },
      { field: 'telefone', header: 'Telefone' },
      { field: 'email', header: 'Email' },
      { field: 'municipio', header: 'Cidade' },
      { field: 'createdAt', header: 'Criado em' },
      { field: 'updatedAt', header: 'Atualizado em' }
  ];

  this._selectedColumns = [
    { field: 'id', header: 'Id' },
      { field: 'nome', header: 'Nome' },
      { field: 'cnpj_cpf', header: 'CNPJ / CPF' },
      { field: 'email', header: 'Email' },
      { field: 'telefone', header: 'Telefone' },
      { field: 'updatedAt', header: 'Atualizado em' }
  ];

  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe()
  }

  getPessoas(): void {
    this.subscription = this.pessoaService
      .getPessoas()
      .subscribe({
        next: (pessoas) => this.pessoas = pessoas.pessoas,
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

  new(){
    this.router.navigate(['/home/pessoas/0'])
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
    return this.pessoas
      ? this.first === this.pessoas.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.pessoas ? this.first === 0 : true;
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  clear(table: Table) {
    table.clear();
  }

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
}

set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this.cols.filter(col => val.includes(col));
}
}
