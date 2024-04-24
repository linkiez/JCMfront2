import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { IRNC } from 'src/app/models/rnc';
import { QueryService } from 'src/app/services/query.service';
import { RNCService } from 'src/app/services/rnc.service';

@Component({
  selector: 'app-rncs',
  templateUrl: './rncs.component.html',
  styleUrls: ['./rncs.component.css'],
  providers: [ConfirmationService],
})
export class RNCsComponent implements OnInit {
  @ViewChild('paginator') paginator!: Paginator;

  rncs: IRNC[] = [];

  totalRecords: number = 0;

  first = 0;

  status: string[] = ['Aberto', 'Fechado'];

  constructor(
    public queryService: QueryService,
    private rncService: RNCService,
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getRNCs(true);
    this.first = this.queryService.rncs.page * this.queryService.rncs.pageCount;
  }

  getRNCs(pageChange?: boolean): void {
    this.queryService.rncs.page = pageChange ? this.queryService.rncs.page : 0;

    this.rncService.getRNCs(this.queryService.rncs).subscribe({
      next: (consulta) => {
        this.rncs = consulta.rncs;

        this.totalRecords = consulta.totalRecords;
        if (!pageChange) this.paginator.changePageToFirst(new Event(''));
      },
      error: (error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao carregar as RNCs. - ' + error.error,
        });
      },
    });
  }

  pageChange(event: any) {
    this.queryService.rncs.page = event.page;
    this.queryService.rncs.pageCount = event.rows;
    this.getRNCs(true);
  }

  clickDeleted(id: number) {
    if (!this.queryService.produtos.deleted) {
      this.router.navigate([`home/rnc/${id}`]);
    } else {
      this.confirm(id);
    }
  }

  confirm(id: number) {
    this.confirmationService.confirm({
      message: 'Deseja restaurar esta RNC?',
      accept: () => {
        this.rncService.restoreRNC(id).subscribe({
          error: (error: any) => {
            console.error(error);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao restaurar a RNC. - ' + error.error,
            });
          },
          complete: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'A RNC foi restaurada.',
            });
            this.getRNCs();
          },
        });
      },
    });
  }

  search() {
    if (
      this.queryService.rncs.searchValue?.length! > 2 ||
      this.queryService.rncs.searchValue?.length! === 0
    )
      this.getRNCs();
  }

  filterSetOP(rnc: IRNC) {
    return new Set(
      rnc.rnc_items?.map((item) => item.ordem_producao_item?.id_ordem_producao)
    );
  }

  filterSetCliente(rnc: IRNC) {
    return new Set(
      rnc.rnc_items?.map(
        (item) =>
          item.ordem_producao_item?.orcamento_item?.orcamento?.pessoa?.nome
      )
    );
  }
}
