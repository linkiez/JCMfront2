import { CaixaDeStatusComponent } from './../../../components/caixaDeStatus/caixaDeStatus.component';
import { Query } from 'src/app/models/query';
import { OrdemProducao } from './../../../models/ordem-producao';
import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdemProducaoService } from 'src/app/services/ordem-producao.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Paginator } from 'primeng/paginator';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-ordens-producao',
  templateUrl: './ordens-producao.component.html',
  styleUrls: ['./ordens-producao.component.css'],
})
export class OrdensProducaoComponent implements OnInit {
  @ViewChild('paginator') paginator!: Paginator;

  ordemProducao: OrdemProducao[] = [];

  CaixaDeStatusOptions = [{valor:'Aguardando'}, {valor:'Em produção'}, {valor:'Finalizado'}, {valor:'Entregue'}]

  totalRecords: number = 0;

  query: Query = {
    page: 0,
    pageCount: 10,
    searchValue: '',
    deleted: false,
  };

  constructor(
    private ordemProducaoService: OrdemProducaoService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getOrdemProducao();

  }

  getOrdemProducao(pageChange?: boolean) {
    this.query.page = pageChange ? this.query.page : 0;

    this.ordemProducaoService
      .getOrdemProducoes(this.query)
      .pipe(
        debounceTime(1000), // espera um tempo antes de começar
        distinctUntilChanged() // recorda a ultima pesquisa
      )
      .subscribe({
        next: (consulta) => {
          this.ordemProducao = consulta.ordemProducao;
          this.totalRecords = consulta.totalRecords;
          if (!pageChange) this.paginator.changePageToFirst(new Event(''));
          this.ordemProducao = this.ordemProducao.map((ordemProducao) => {
            ordemProducao.editable = false;
            return ordemProducao;
          });
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: error.message,
          });
        },
      });
  }

  pageChange(event: any) {
    if (event) {
      this.query.page = event.page;
      this.query.pageCount = event.rows;
      this.getOrdemProducao(true);
    }
  }
}
