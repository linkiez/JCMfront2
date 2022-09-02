import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Fornecedor } from 'src/app/models/fornecedor';
import { PessoaService } from 'src/app/services/pessoa.service';

@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.scss']
})
export class FornecedoresComponent implements OnInit {

  @ViewChild('dt') dt: Table | undefined;

  fornecedores: Array<Fornecedor> = []

  first = 0;

  rows = 10;

  constructor(private pessoaService: PessoaService, private router: Router) { }

  ngOnInit(): void {
    this.getPessoas();
  }

  getPessoas(): void {
    this.pessoaService
      .getPessoas()
      .subscribe((fornecedores) => (this.fornecedores = fornecedores), (error) => console.log(error));
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
    return this.fornecedores
      ? this.first === this.fornecedores.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.fornecedores ? this.first === 0 : true;
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  clear(table: Table) {
    table.clear();
  }

}
