import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-iqf',
  templateUrl: './iqf.component.html',
  styleUrls: ['./iqf.component.scss']
})
export class IqfComponent implements OnInit{

  ctx = document.getElementById('IQFChart') as HTMLCanvasElement;

  constructor() { }

  ngOnInit(): void {
    this.renderChart();
  }

  renderChart() {
    const ctx = document.getElementById('IQFChart') as HTMLCanvasElement;
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        datasets: [{
          label: 'My First dataset',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: [0, 10, 5, 2, 20, 30, 45],
        }]
      },
      options: {}
    });
  }
}
