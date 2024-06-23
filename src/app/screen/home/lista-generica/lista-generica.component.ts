import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import {
  IListaGenerica,
  IListaGenericaItem,
} from '../../../models/lista-generica';
import { ListaGenericaService } from '../../../services/lista-generica.service';
import { isEqual } from 'lodash';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-lista-generica',
  templateUrl: './lista-generica.component.html',
  styleUrls: ['./lista-generica.component.css'],
})
export class ListaGenericaComponent implements OnInit {
  listas: Array<IListaGenerica> = [];

  novaLista: string = '';

  novoItem: string = '';

  novoValor: string = '';

  selectedLista: IListaGenerica = { lista_generica_items: [] };

  first = 0;

  rows = 10;

  @ViewChild('dt') dt: Table | undefined;

  @ViewChild('dt2') dt2: Table | undefined;

  constructor(
    private listaGenericaService: ListaGenericaService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getListas();
  }

  getListas() {
    this.listaGenericaService.getListaGenericas().subscribe({
      next: (listas) => {
        this.listas = listas;
      },
      error: (error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao buscar listas genéricas - ' + error.error.message,
        });
      },
    });
  }

  createListaGenerica() {
    this.listaGenericaService
      .addListaGenerica({ nome: this.novaLista, lista_generica_items: [] })
      .subscribe({
        complete: () => this.getListas(),
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao criar lista genérica - ' + error.error.message,
          });
        },
      });
  }

  selectLista(lista: IListaGenerica) {
    this.selectedLista = lista;
  }

  isEqualSelectedLista(lista: IListaGenerica) {
    return this.selectedLista.id === lista.id;
  }

  addItem() {
    if (!this.selectedLista.lista_generica_items)
      this.selectedLista.lista_generica_items = [];
    this.selectedLista.lista_generica_items.push({
      valor: this.novoItem,
      valor2: this.novoValor,
    });
  }

  removeItem(item: IListaGenericaItem) {
    const index = this.selectedLista.lista_generica_items.indexOf(item);
    this.selectedLista.lista_generica_items.splice(index, 1);
  }

  saveItems() {
    this.listaGenericaService
      .updateListaGenerica(this.selectedLista)
      .subscribe({
        next: (updatedLista: any) => {
          this.selectedLista = updatedLista;
          this.getListas();
        },
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao salvar lista genérica - ' + error.error.message,
          });
        },
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
    return this.listas ? this.first === this.listas.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.listas ? this.first === 0 : true;
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  applyFilterGlobal2($event: any, stringVal: any) {
    this.dt2!.filterGlobal(
      ($event.target as HTMLInputElement).value,
      stringVal
    );
  }

  destroyListaGenerica(lista: IListaGenerica) {
    this.listaGenericaService.deleteListaGenerica(lista).subscribe({
      complete: () => this.getListas(),
      error: (error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao deletar lista genérica - ' + error.error.message,
        });
      },
    });
  }

  clear(table: Table) {
    table.clear();
  }
}
