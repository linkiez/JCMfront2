import { QueryService } from 'src/app/services/query.service';
import { CaixaDeStatusComponent } from './../../../components/caixaDeStatus/caixaDeStatus.component';
import { Query } from 'src/app/models/query';
import { OrdemProducao } from './../../../models/ordem-producao';
import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdemProducaoService } from 'src/app/services/ordem-producao.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Paginator } from 'primeng/paginator';
import { MessageService } from 'primeng/api';
import { UsuarioService } from 'src/app/authentication/usuario.service';

@Component({
  selector: 'app-ordens-producao',
  templateUrl: './ordens-producao.component.html',
  styleUrls: ['./ordens-producao.component.css'],
})
export class OrdensProducaoComponent implements OnInit {
  @ViewChild('paginator') paginator!: Paginator;

  ordemProducao: OrdemProducao[] = [];

  CaixaDeStatusOptions = [{valor:'Aguardando'}, {valor:'Em produção'}, {valor:'Finalizado'}, {valor:'Entregue'}, {valor:'Cancelado'}]

  totalRecords: number = 0;

  first = 0;

  constructor(
    private ordemProducaoService: OrdemProducaoService,
    private messageService: MessageService,
    private usuarioService: UsuarioService,
    public queryService: QueryService
  ) {}

  ngOnInit() {
    this.getOrdemProducao(true);
    this.first = this.queryService.ordemProducao.page * this.queryService.ordemProducao.pageCount;
  }

  getOrdemProducao(pageChange?: boolean) {
    this.queryService.ordemProducao.page = pageChange ? this.queryService.ordemProducao.page : 0;

    this.ordemProducaoService
      .getOrdemProducoes(this.queryService.ordemProducao)
      // .pipe(
      //   debounceTime(1000), // espera um tempo antes de começar
      //   distinctUntilChanged() // recorda a ultima pesquisa
      // )
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

  newEditable(op: OrdemProducao) {

    if (op.data_prazo) op.data_prazo = new Date(op.data_prazo);
    if (op.data_finalizacao) op.data_finalizacao = new Date(op.data_finalizacao);
    if (op.data_entregue) op.data_entregue = new Date(op.data_entregue);
    if (op.data_negociado) op.data_negociado = new Date(op.data_negociado);
    op.new = { ...op };
    if (op.ordem_producao_historicos != undefined) {
      op.new.ordem_producao_historicos = [...op.ordem_producao_historicos];
    }
  }

  log(op: any) {
    console.log(op)
  }

  salvar(op: OrdemProducao, index: number) {
    this.ordemProducaoService.updateOrdemProducao(op.new!).subscribe({
      next: (ordemProducao) => {
        this.ordemProducao[index] = ordemProducao;
        this.ordemProducao[index].editable = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'A ordem de produção foi atualizada.',
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
      this.queryService.ordemProducao.page = event.page;
      this.queryService.ordemProducao.pageCount = event.rows;
      this.getOrdemProducao(true);
    }
  }

  addHistorico(index: number) {
    const historico = {
      texto: this.ordemProducao[index].new?.newItem,
      usuario: this.usuarioService.getUsuario(),
      updatedAt: new Date(),
    }
    this.ordemProducao[index].new?.ordem_producao_historicos?.push(historico)
    console.log(this.ordemProducao[index])
  }

  deleteHistorico(index: number, indexHistorico: number) {
    this.ordemProducao[index].new?.ordem_producao_historicos?.splice(indexHistorico, 1)
  }

  search() {
    this.getOrdemProducao();
  }

  isToday(date: Date) {
    if (!date) return false;
    date = new Date(date);
    const today = new Date();
    return date.getDate() === today.getDate()
      && date.getMonth() === today.getMonth()
      && date.getFullYear() === today.getFullYear();
  }

  isBeforeToday(date: Date) {
    if (!date) return false;
    date = new Date(date);
    const today = new Date();
    return date < today;
  }

  isBeforeDate(date: Date, date2: Date) {
    if (!date || !date2) return false;
    date = new Date(date);
    date2 = new Date(date2);
    return date < date2;
  }

  isAfterDate(date: Date, date2: Date) {
    if (!date || !date2) return false;
    date = new Date(date);
    date2 = new Date(date2);
    return date > date2;
  }

  isEqualsDate(date: Date, date2: Date) {
    if (!date || !date2) return false;
    date = new Date(date);
    date2 = new Date(date2);
    return date.getDate() === date2.getDate()
      && date.getMonth() === date2.getMonth()
      && date.getFullYear() === date2.getFullYear();
  }

  onChangeStatus(event: any, index: number) {
    this.ordemProducao[index].new!.status = event;
  }
}
