import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { MessageService } from 'primeng/api';
import { PedidoCompraService } from 'src/app/services/pedidocompra.service';
import { QueryService } from 'src/app/services/query.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Fornecedor } from 'src/app/models/fornecedor';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { Query } from 'src/app/models/query';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-iqf',
  templateUrl: './iqf.component.html',
  styleUrls: ['./iqf.component.css'],
})
export class IqfComponent implements OnInit {
  ctx = document.getElementById('IQFChart') as HTMLCanvasElement;

  constructor(
    private pedidoComprasService: PedidoCompraService,
    public queryService: QueryService,
    private messageService: MessageService,
    private fornecedorService: FornecedorService
  ) {}

  iqfData = {
    data: [],
    getPercentage: function () {
      return this.data.map((item: any) => {
        const total = item.total * 100;
        return total > 100 ? 100 : total;
      });
    },
  };

  selectedFornecedor: Fornecedor | undefined = {};
  fornecedores: Fornecedor[] = [];

  chart: Chart | undefined;

  meses: string[] = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  ngOnInit(): void {
    this.getPedidosComprasIQF();
    this.renderChart();
  }

  getPedidosComprasIQF() {
    this.pedidoComprasService
      .getPedidoComprasIQF(this.queryService.iqf)
      .subscribe({
        next: (response: any) => {
          this.iqfData.data = response;
          console.log(this.iqfData);
          this.renderChart();
        },
        error: (error: any) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro ao buscar IQF',
            detail: error.error,
          });
        },
      });
  }

  renderChart() {
    const ctx = document.getElementById('IQFChart') as HTMLCanvasElement;
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart(ctx, {
      type: 'bar',

      data: {
        labels: this.meses,
        datasets: [
          {
            label: 'IQF',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: this.iqfData.getPercentage(),
            datalabels: {
              anchor: 'center',
              formatter: (value: number) => {
                return value.toFixed(2) + '%';
              },
              color: 'white',
            },
          },
          {
            label: 'Meta',
            type: 'line',
            data: [80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80],
            borderDash: [5, 5],
            borderColor: 'lightblue',
            datalabels: {
              display: false,
            },
          },
        ],
      },
      plugins: [ChartDataLabels],
    });
  }

  searchFornecedor(event: any) {
    let query: Query = {
      page: 0,
      pageCount: 10,
      searchValue: event.query,
      deleted: false,
    };

    this.fornecedorService.getFornecedores(query).pipe(distinctUntilChanged(), debounceTime(500)).subscribe({
      next: (fornecedores) => {
        this.fornecedores = fornecedores.fornecedores;
      },
      error: (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao buscar fornecedores - ' + error.error,
        });
      },
    });
  }

  onSelectFornecedor(event: any) {
    this.queryService.iqf.fornecedor = event.id;
    this.getPedidosComprasIQF();
  }
}
