import { IListaGenericaItem } from './../../../../models/lista-generica';
import {
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
  ViewChildren,
  ElementRef,
  QueryList,
  AfterViewInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  Subscription,
} from 'rxjs';
import { IPedidoCompra, IPedidoCompraItem } from 'src/app/models/pedido-compra';
import { IPessoa } from 'src/app/models/pessoa';
import { IProduto } from 'src/app/models/produto';
import { IQuery } from 'src/app/models/query';
import { ListaGenericaService } from 'src/app/services/lista-generica.service';
import { PedidoCompraService } from 'src/app/services/pedidocompra.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { DynamicFormService } from 'src/app/services/dynamic-form.service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { IArquivo } from 'src/app/models/arquivo';
import { IFornecedor } from 'src/app/models/fornecedor';
import {
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  PercentPipe,
} from '@angular/common';
import { consoleLogDev } from 'src/app/utils/consoleLogDev';
import { Chart, ChartData } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-pedidocompra',
  templateUrl: './pedidocompra.component.html',
  styleUrls: ['./pedidocompra.component.css'],
  providers: [ConfirmationService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PedidoCompraComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(
    private pedidoCompraService: PedidoCompraService,
    private fornecedorService: FornecedorService,
    private produtoService: ProdutoService,
    private listaGenericaService: ListaGenericaService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public dynamicFormService: DynamicFormService
  ) {}

  @ViewChildren('pesoEntregueChart')
  pesoEntregueCBox$: QueryList<ElementRef<HTMLCanvasElement>> = null;
  pesoEntregueCBoxs: HTMLCanvasElement[] = [];
  pesoEntregueChartData: any[] = [];
  charts: Chart[] = [];

  decimalPipe = new DecimalPipe('pt-BR');
  currencyPipe = new CurrencyPipe('pt-BR', 'BRL');
  percentPipe = new PercentPipe('pt-BR');
  datePipe = new DatePipe('pt-BR');

  pedidoCompra = this.dynamicFormService.createFormFromObject<IPedidoCompra>({
    id: undefined,
    fornecedor: {
      id: {
        value: 0,
        validators: [
          {
            name: 'nullValidator',
          },
          {
            name: 'min',
            min: 1,
          },
        ],
      },
      // id_pessoa: undefined,
      pessoa: {
        id: 0,
        nome: '',
        razao_social: '',
        pessoa_juridica: false,
        telefone: 0,
        email: '',
        email_nfe: '',
        endereco: '',
        numero: 0,
        complemento: '',
        bairro: '',
        municipio: '',
        uf: '',
        cep: 0,
        ie_rg: '',
        cnpj_cpf: '',
        data_nasc: null,
        descricao: '',
        deletedAt: null,
        updatedAt: null,
        createdAt: null,
        contatos: [],
        files: [],
      },
      data_aprov: null,
      data_venc: null,
      createdAt: null,
      updatedAt: null,
      deletedAt: null,
      observacao: null,
    },
    pedido_compra_items: {
      value: [
        {
          produto: {
            id: null,
            nome: '',
            categoria: '',
            espessura: 0,
            peso: 0,
            updatedAt: null,
            createdAt: null,
            deletedAt: null,
            files: [
              {
                id: null,
                url: '',
                originalFilename: '',
                newFilename: '',
                mimeType: '',
                bucket: '',
                region: '',
                deletedAt: null,
                updatedAt: null,
                createdAt: null,
              },
            ],
            preco: 0,
          },
          prazo: {
            value: new Date(),
            pipe: {
              pipe: this.datePipe,
              args: ['dd/MM/yyyy'],
            },
          },
          quantidade: {
            value: 0,
            pipe: {
              pipe: this.decimalPipe,
              args: ['1.0-2'],
            },
            validators: [
              {
                name: 'min',
                min: 1,
              },
            ],
          },
          peso: {
            value: 0,
            pipe: {
              pipe: this.decimalPipe,
              args: ['1.0-2'],
            },
            validators: [
              {
                name: 'min',
                min: 1,
              },
            ],
          },
          ipi: {
            value: 0,
            pipe: {
              pipe: this.percentPipe,
              args: ['1.2-2'],
            },
            validators: [
              {
                name: 'min',
                min: 0,
              },
            ],
          },
          preco: {
            value: 0,
            pipe: {
              pipe: this.currencyPipe,
            },
          },
          total: {
            value: 0,
            pipe: {
              pipe: this.currencyPipe,
            },
          },
          peso_entregue: 0,
          status: 'Aguardando',
          dimensao: '',
          deletedAt: null,
          updatedAt: null,
          createdAt: null,
          id_pedido: null,
          id_produto: null,
        },
      ],
      validators: [
        {
          name: 'nullValidator',
        },
        {
          name: 'minLength',
          min: 1,
        },
      ],
    },
    cond_pagamento: 'AVISTA',
    frete: {
      value: 0,
      pipe: {
        pipe: this.currencyPipe,
      },
      validators: [
        {
          name: 'nullValidator',
        },
        {
          name: 'min',
          min: 0,
        },
      ],
    },
    status: 'Orçamento',
    pedido: '',
    data_emissao: {
      value: new Date(),
      pipe: {
        pipe: this.datePipe,
        args: ['dd/MM/yyyy'],
      },
    },
    deletedAt: null,
    updatedAt: null,
    createdAt: null,
    // id_fornecedor: null,
    files: [
      {
        id: null,
        url: '',
        originalFilename: '',
        newFilename: '',
        mimeType: '',
        bucket: '',
        region: '',
        deletedAt: null,
        updatedAt: null,
        createdAt: null,
      },
    ],
    total: {
      value: 0,
      pipe: {
        pipe: this.currencyPipe,
      },
    },
    observacao: '',
    transporte: '',
  });

  fornecedores: IPessoa[] = [];

  produtos: IProduto[] = [];

  dimensoes$ = this.listaGenericaService
    .getByNameListaGenerica('produtoDimensoes')
    .pipe(
      map((listaGenerica: any) => listaGenerica.lista_generica_items),
      catchError((error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail:
            'Erro ao carregar as dimensões dos produtos. - ' +
            error.error.message,
        });
        return [];
      })
    );

  condicaoPagamento$ = this.listaGenericaService
    .getByNameListaGenerica('condicaoPagamento')
    .pipe(
      map((listaGenerica: any) => listaGenerica.lista_generica_items),
      catchError((error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail:
            'Erro ao carregar as condições de pagamento. - ' +
            error.error.message,
        });
        return [];
      })
    );

  status$ = this.listaGenericaService
    .getByNameListaGenerica('statusPedidoCompra')
    .pipe(
      map((listaGenerica: any) => listaGenerica.lista_generica_items),
      catchError((error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao carregar lista de status. - ' + error.error.message,
        });
        return [];
      })
    );

  observacoes: IListaGenericaItem[] = [];

  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.getPedidoCompra();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.pesoEntregueCBox$.changes.subscribe(() => {
      this.pesoEntregueCBoxs = this.pesoEntregueCBox$
        .toArray()
        .map((element: ElementRef<HTMLCanvasElement>) => element.nativeElement);
      this.renderChart();
    });
  }

  getPedidoCompra() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id.value != 0) {
      this.subscription = this.pedidoCompraService
        .getPedidoCompra(this.id.value)
        // .pipe(debounceTime(1000))
        .subscribe({
          next: (pedido) => {
            pedido = pedido as IPedidoCompra;
            pedido.pedido_compra_items = pedido.pedido_compra_items.map(
              (item) => {
                item.prazo = new Date(item.prazo);
                return item;
              }
            );
            this.pedidoCompra = this.dynamicFormService.resizeForm(
              this.pedidoCompra,
              pedido
            );

            this.pedidoCompra.patchValue(pedido);
            consoleLogDev(this.pedidoCompra);
          },
          error: (error) => {
            console.error(error);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail:
                'Erro ao carregar o pedido de compra. - ' + error.error.message,
            });
          },
          complete: () => {
            this.calculaTotal();
          },
        });
    }
  }

  searchFornecedor(event: any) {
    const query: IQuery = {
      page: 0,
      pageCount: 10,
      searchValue: event.query,
      deleted: false,
    };

    this.subscription = this.fornecedorService
      .getFornecedores(query)
      .pipe(distinctUntilChanged(), debounceTime(500))
      .subscribe({
        next: (fornecedores) => {
          this.fornecedores = fornecedores.fornecedores;
        },
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao carregar os fornecedores. - ' + error.error.message,
          });
        },
      });
  }

  searchProduto(event: any) {
    const query: IQuery = {
      page: 0,
      pageCount: 10,
      searchValue: event.query,
      deleted: false,
    };

    this.produtoService
      .getProdutos(query)
      .pipe(distinctUntilChanged(), debounceTime(500))
      .subscribe({
        next: (consulta) => (this.produtos = consulta.produtos),
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao carregar os produtos. - ' + error.error.message,
          });
        },
      });
  }

  itemPreco(event: any, item: FormControl) {
    const value =
      Number(event.target.value.replace(',', '.').replace(/[^\d]/g, '')) / 100;
    item.setValue(value);
    this.calculaTotal();
  }

  itemPeso(event: any, item: FormControl) {
    const value = Number(event.target.value.replace('.', '').replace(',', '.'));
    item.patchValue(value);
    this.calculaTotal();
  }

  itemIpi(event: any, item: FormControl) {
    const value =
      parseFloat(event.target.value.replace(',', '.').replace(/[^\d]/g, '')) /
      10000;
    item.setValue(value);
    this.calculaTotal();
  }

  calculaTotal() {
    let total = 0;

    this.pedido_compra_items = this.pedido_compra_items.value.map(
      (item: IPedidoCompraItem) => {
        item.total =
          (item.peso || 0) * (item.preco || 0) * ((Number(item.ipi) || 0) + 1);
        total = total + item.total;
        return item;
      }
    );

    total = total + Number(this.frete.value || 0);
    this.total = total;
    this.renderChart();
  }

  calculaPeso(item: FormGroup) {
    const pedidoCompraItem: IPedidoCompraItem = item.value as IPedidoCompraItem;

    const dimensao: any = (pedidoCompraItem.dimensao || '')
      .split('x')
      .map((dimensao: string | number) => {
        dimensao = Number(dimensao.toString().replace(/[^\d]/g, '')) / 1000;
        return isFinite(dimensao) ? dimensao : 0;
      });
    if (pedidoCompraItem.produto?.categoria == 'Chapa') {
      pedidoCompraItem.peso =
        (dimensao[0] || 1) *
        (dimensao[1] || 0) *
        (pedidoCompraItem.produto?.peso || 0) *
        (pedidoCompraItem.produto.espessura || 0) *
        (pedidoCompraItem.quantidade || 0);
    }
    if (pedidoCompraItem.produto?.categoria == 'Barra') {
      pedidoCompraItem.peso =
        (dimensao[0] || 1) *
        (pedidoCompraItem.produto?.peso || 0) *
        // (pedidoCompraItem.produto.espessura || 0) *
        (pedidoCompraItem.quantidade || 0);
    }
    if (pedidoCompraItem.produto?.categoria == 'Peça') {
      pedidoCompraItem.peso =
        (dimensao[0] || 1) *
        (pedidoCompraItem.produto?.peso || 0) *
        (pedidoCompraItem.quantidade || 0);
    }

    item.patchValue(pedidoCompraItem);
    this.calculaTotal();
  }

  getBackPedidos() {
    window.history.back();
  }

  confirm() {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir este pedido de compra?',
      accept: () => {
        this.deletePedido();
      },
    });
  }

  deletePedido() {
    this.pedidoCompraService.deletePedidoCompra(this.id.value).subscribe({
      error: (error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail:
            'Erro ao excluir o pedido de compra. - ' + error.error.message,
        });
      },
      complete: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'O pedido de compra foi excluido.',
        });
        this.router.navigate(['/home/pedidoscompras']);
      },
    });
  }

  createOrUpdate() {
    if (this.dynamicFormService.getAllErrors(this.pedidoCompra)) {
      consoleLogDev(this.dynamicFormService.getAllErrors(this.pedidoCompra));
      return;
    }

    if (!this.files.value[0]?.id && this.files.controls[0])
      this.files.controls[0].disable()

    if (Number(this.id.value) == 0) {
      this.createPedido();
    } else {
      this.updatePedido();
    }
  }
  createPedido() {
    this.pedidoCompraService
      .addPedidoCompra(this.pedidoCompra.value)
      .subscribe({
        next: (response) => {
          if(this.files.controls[0])this.files.controls[0].enable();
          consoleLogDev(this.pedidoCompra.value);
          consoleLogDev(response);
          this.dynamicFormService.resizeForm(this.pedidoCompra, response);
          this.pedidoCompra.patchValue(response);
        },
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail:
              'Erro ao criar o pedido de compra. - ' + error.error.message,
          });
        },
        complete: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'O pedido foi criado.',
          });
          this.router.navigate([`/home/pedidoscompras/${this.id.value}`]);
        },
      });
  }
  updatePedido() {
    this.pedidoCompraService
      .updatePedidoCompra(this.pedidoCompra.value)
      .subscribe({
        next: (response) => {
          if(this.files.controls[0])this.files.controls[0].enable();
          this.dynamicFormService.resizeForm(this.pedidoCompra, response);
          this.pedidoCompra.patchValue(response);
        },
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail:
              'Erro ao atualizar o pedido de compra. - ' + error.error.message,
          });
        },
        complete: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'O pedido foi atualizado.',
          });
        },
      });
  }

  newPedidoCompraItem() {
    this.pedido_compra_items.push(
      this.dynamicFormService.createFormFromObject<IPedidoCompraItem>({
        produto: {
          id: null,
          nome: '',
          categoria: '',
          espessura: 0,
          peso: 0,
          updatedAt: null,
          createdAt: null,
          deletedAt: null,
          files: [
            {
              id: null,
              url: '',
              originalFilename: '',
              newFilename: '',
              mimeType: '',
              bucket: '',
              region: '',
              deletedAt: null,
              updatedAt: null,
              createdAt: null,
            },
          ],
          preco: 0,
        },
        prazo: {
          value: new Date(),
          pipe: {
            pipe: this.datePipe,
            args: ['dd/MM/yyyy'],
          },
        },
        quantidade: {
          value: 0,
          pipe: {
            pipe: this.decimalPipe,
            args: ['1.0-2'],
          },
          validators: [
            {
              name: 'min',
              min: 1,
            },
          ],
        },
        peso: {
          value: 0,
          pipe: {
            pipe: this.decimalPipe,
            args: ['1.0-2'],
          },
          validators: [
            {
              name: 'min',
              min: 1,
            },
          ],
        },
        ipi: {
          value: 0,
          pipe: {
            pipe: this.percentPipe,
            args: ['1.2-2'],
          },
          validators: [
            {
              name: 'min',
              min: 0,
            },
          ],
        },
        preco: {
          value: 0,
          pipe: {
            pipe: this.currencyPipe,
          },
        },
        total: {
          value: 0,
          pipe: {
            pipe: this.currencyPipe,
          },
        },
        peso_entregue: 0,
        status: 'Aguardando',
        dimensao: '',
        deletedAt: null,
        updatedAt: null,
        createdAt: null,
        id_pedido: null,
        id_produto: null,
      },)
    );
  }

  setFiles(files: IArquivo[]) {
    if (this.files.length > 0) {
      this.files.clear();
    }
    for (const file of files) {
      this.files.push(
        this.dynamicFormService.createFormFromObject<IArquivo>(file)
      );
    }
  }

  removeItem(index: number) {
    this.pedido_compra_items.removeAt(index);
  }

  calculatePesoEntreguePercentage(itemGroup: FormGroup) {
    const item = itemGroup.value as IPedidoCompraItem;
    let percentage =
      (((item.peso_entregue || 0) / (item.peso || 1)) as number) * 100;
    if (percentage > 100) {
      percentage = 100;
    }
    return +percentage.toFixed(2);
  }

  renderChart() {
    if (this.pedidoCompra.value.status == 'Orçamento') return;
    for (const chart of this.charts) {
      if (chart) {
        chart.destroy();
      }
    }
    for (let cBox, i = 0; (cBox = this.pesoEntregueCBoxs[i]); i++) {
      const pedidoCompraItem = this.pedido_compra_items.controls[i];

      const percent = this.calculatePesoEntreguePercentage(
        pedidoCompraItem as FormGroup
      );
      // this.charts = [];
      this.charts.push(
        new Chart(cBox, {
          type: 'doughnut',
          data: <ChartData>{
            datasets: [
              {
                data: [percent, 100 - percent],
                backgroundColor: [
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
                datalabels: {
                  anchor: 'center',
                  formatter: (value: number) => {
                    if (value) return value.toFixed(2) + '%';
                    else return '';
                  },
                  color: 'white',
                  display(context) {
                    return (context.dataIndex as number) == 0;
                  },
                },
              },
            ],
          },
          plugins: [ChartDataLabels],
        })
      );
    }
  }

  get pedido_compra_items(): FormArray {
    return this.pedidoCompra.get('pedido_compra_items') as FormArray;
  }

  set pedido_compra_items(value: IPedidoCompraItem[]) {
    this.pedido_compra_items.setValue(value);
  }

  get files(): FormArray {
    return this.pedidoCompra.get('files') as FormArray;
  }

  set files(value: IArquivo[]) {
    this.files.patchValue(value);
  }

  get id(): FormControl {
    return this.pedidoCompra.get('id') as FormControl;
  }

  set id(value: number) {
    this.id.setValue(value);
  }

  get total(): FormControl {
    return this.pedidoCompra.get('total') as FormControl;
  }

  set total(value: number) {
    this.total.setValue(value);
  }

  get frete(): FormControl {
    return this.pedidoCompra.get('frete') as FormControl;
  }

  set frete(value: any) {
    this.frete.setValue(+value.replace(/[^\d]/g, '') / 100);
    this.calculaTotal();
  }

  get status(): FormControl {
    return this.pedidoCompra.get('status') as FormControl;
  }

  set status(value: string) {
    this.status.setValue(value);
  }

  get pedido(): FormControl {
    return this.pedidoCompra.get('pedido') as FormControl;
  }

  set pedido(value: string) {
    this.pedido.setValue(value);
  }

  get data_emissao(): FormControl {
    return this.pedidoCompra.get('data_emissao') as FormControl;
  }

  get fornecedor(): FormGroup {
    return this.pedidoCompra.get('fornecedor') as FormGroup;
  }

  set fornecedor(value: IFornecedor) {
    this.fornecedor.patchValue(value);
  }

  get cond_pagamento(): FormControl {
    return this.pedidoCompra.get('cond_pagamento') as FormControl;
  }

  getFormattedValue(formControl: FormControl): string {
    return this.dynamicFormService.getFormattedValue(formControl);
  }

  optionLabelFornecedor(event: any) {
    return event.pessoa.nome;
  }

  optionLabelProduto(event: any) {
    return event.nome;
  }
}
