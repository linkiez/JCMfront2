import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Produto } from 'src/app/models/produto';
import { Query } from 'src/app/models/query';
import { RIR } from 'src/app/models/rir';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-rir',
  templateUrl: './rir.component.html',
  styleUrls: ['./rir.component.scss'],
})
export class RirComponent {
  rir: RIR = {};

  produtos: Produto[] = [];

  constructor(
    private produtoService: ProdutoService,
    private messageService: MessageService
  ) {}

  searchProduto(event: any) {
    let query: Query = {
      page: 0,
      pageCount: 10,
      searchValue: event.query,
      deleted: false,
    };

    this.produtoService
      .getProdutos(query)
      // .pipe(
      //   distinctUntilChanged(), // recorda a ultima pesquisa
      //   debounceTime(1000) // espera um tempo antes de começar
      // )
      .subscribe({
        next: (consulta) => (this.produtos = consulta.produtos),
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
}
