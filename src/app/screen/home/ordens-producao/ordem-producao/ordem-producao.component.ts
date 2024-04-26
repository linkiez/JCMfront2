import { ArquivoService } from 'src/app/services/arquivo.service';
import { ListaGenericaService } from './../../../../services/lista-generica.service';
import { MessageService } from 'primeng/api';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnChanges,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IOrdemProducao,
  IOrdemProducaoItem,
  IOrdemProducaoItemProcesso,
} from 'src/app/models/ordem-producao';
import { OrdemProducaoService } from 'src/app/services/ordem-producao.service';
import Quill from 'quill';
import * as xlsx from 'xlsx';
import { RIRService } from 'src/app/services/rir.service';
import { IRIR } from 'src/app/models/rir';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  debounce,
  debounceTime,
  distinctUntilChanged,
  firstValueFrom,
  of,
} from 'rxjs';
import {
  IListaGenerica,
  IListaGenericaItem,
  IPrinterSettings,
} from 'src/app/models/lista-generica';
import { privateDecrypt } from 'crypto';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-ordem-producao',
  templateUrl: './ordem-producao.component.html',
  styleUrls: ['./ordem-producao.component.css'],
})
export class OrdemProducaoComponent
  implements OnInit, OnDestroy, AfterViewChecked
{
  @ViewChildren('cardInsideContainer') cardInsideContainer?: QueryList<
    ElementRef<HTMLDivElement>
  >;

  ordemProducao: IOrdemProducao = {};

  etiquetas: boolean = true;

  impressoraDetalhes: boolean = false;

  impressoras?: IPrinterSettings[];

  impressora?: IPrinterSettings;

  impressoraPrevious?: IPrinterSettings;

  impressora$ = new BehaviorSubject(this.impressora);

  impressoraSubscription?: Subscription;

  impressoraEdit: IPrinterSettings = {
    id_lista: this.impressoraIdListaGenerica,
    valor: 'Nova Impressora',
    valor2: {
      width: 100,
      height: 50,
      margin: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
      fontSize: 10,
    },
  };

  impressoraIdListaGenerica?: number;

  rirs: IRIR[] = [];

  logoURL?: string;

  constructor(
    private ordemProducaoService: OrdemProducaoService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router,
    private RIRService: RIRService,
    private ListaGenericaService: ListaGenericaService,
    private ArquivoService: ArquivoService,
    private sanitizer: DomSanitizer,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.getOrdemProducao();
    this.getImpressoras();

    this.impressoraSubscription = this.impressora$.subscribe({
      next: (impressora) => {
        this.impressora = impressora;
      },
    });
  }

  ngOnDestroy(): void {
    if (this.impressoraSubscription) {
      this.impressoraSubscription.unsubscribe();
    }
  }

  ngAfterViewChecked(): void {
    // Check if impressora has changed and the condition to adjust font size is met
    if (
      this.impressora !== this.impressoraPrevious &&
      this.cardInsideContainer?.first
    ) {
      this.adjustFontSize();
      // Update previousImpressora to the current impressora after adjustment
      this.impressoraPrevious = this.impressora;
    }
  }

  getOrdemProducao() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.ordemProducaoService.getOrdemProducao(id).subscribe({
      next: (ordemProducao) => {
        if (ordemProducao.ordem_producao_items)
          for (const ordem_producao_item of ordemProducao.ordem_producao_items) {
            if (ordem_producao_item.observacao)
              ordem_producao_item.observacao = this.sanitizer
                .bypassSecurityTrustHtml(ordem_producao_item.observacao)
                .toString();
          }
        this.ordemProducao = this.sortOrdemProducaoItems(ordemProducao);
        console.log(this.ordemProducao);
      },
      error: (error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao buscar ordem de produção - ' + error.error,
        });
      },
      complete: async () => {
        if (this.ordemProducao?.orcamento?.empresa?.id_file_logoBlack)
          this.logoURL = await firstValueFrom(
            this.ArquivoService.getUrlArquivo(
              this.ordemProducao?.orcamento?.empresa?.id_file_logoBlack
            )
          );
      },
    });
  }

  getImpressoras() {
    this.ListaGenericaService.getByNameListaGenerica(
      'impressorasEtiquetas'
    ).subscribe({
      next: (impressoras) => {
        this.impressoraIdListaGenerica = impressoras.id;
        this.impressoras = impressoras.lista_generica_items.map(
          (impressora) => {
            impressora.valor2 = (impressora.valor2 as string).replace(
              /'/g,
              '"'
            );
            impressora.valor2 = JSON.parse(impressora.valor2 as string);
            return impressora;
          }
        ) as unknown as IPrinterSettings[];

        this.impressora$.next(this.impressoras[0]);
      },
      error: (error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao buscar impressoras - ' + error.error,
        });
      },
      complete: () => {},
    });
  }

  createImpressora() {
    const impresoraListaGenericaItem: IListaGenericaItem =
      this.convertIPrinterSettingsToListaGenericaItem(this.impressoraEdit!);

    this.ListaGenericaService.addListaGenericaItem(
      impresoraListaGenericaItem
    ).subscribe({
      next: (impressora) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Impressora adicionada com sucesso',
        });
      },
      error: (error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao adicionar impressora -' + error.error,
        });
      },
      complete: () => {
        this.getImpressoras();
        this.toggleImpressoraDetalhes();
      },
    });
  }

  updateImpressora() {
    const impresoraListaGenericaItem: IListaGenericaItem =
      this.convertIPrinterSettingsToListaGenericaItem(this.impressoraEdit!);
    this.ListaGenericaService.updateListaGenericaItem(
      impresoraListaGenericaItem
    ).subscribe({
      next: (impressora) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Impressora atualizada com sucesso',
        });
      },
      error: (error: any) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao atualizar impressora -' + error.error,
        });
      },
      complete: () => {
        this.getImpressoras();
        this.toggleImpressoraDetalhes();
      },
    });
  }

  createOrUpdateImpressora() {
    if (!this.impressoraIdListaGenerica) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Lista de Impressoras não encontrada',
      });
      return;
    }
    if (!this.impressoraEdit) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Impressora não encontrada',
      });
      return;
    }
    if (this.impressoraEdit.id) {
      this.updateImpressora();
    } else {
      this.createImpressora();
    }
  }

  deleteImpressora() {
    if (!this.impressoraIdListaGenerica) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Lista de Impressoras não encontrada',
      });
      return;
    }
    if (!this.impressoraEdit) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Impressora não encontrada',
      });
      return;
    }
    const impresoraListaGenericaItem: IListaGenericaItem =
      this.convertIPrinterSettingsToListaGenericaItem(this.impressoraEdit!);

    this.ListaGenericaService.deleteListaGenericaItem(
      impresoraListaGenericaItem
    ).subscribe({
      next: (impressora) => {
        this.messageService.add({
          severity: 'info',
          summary: 'Sucesso',
          detail: 'Impressora excluída com sucesso',
        });
      },
      error: (error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao excluir impressora -' + error.error,
        });
      },
      complete: () => {
        this.getImpressoras();
        this.toggleImpressoraDetalhes();
      },
    });
  }

  newImpressora() {
    this.impressoraEdit = {
      id_lista: this.impressoraIdListaGenerica,
      valor: 'Nova Impressora',
      valor2: {
        width: 100,
        height: 50,
        margin: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
        fontSize: 10,
      },
    };
    this.toggleImpressoraDetalhes();
  }

  editImpressora() {
    this.impressoraEdit = { ...this.impressora } as IPrinterSettings;
    this.toggleImpressoraDetalhes();
  }

  convertIPrinterSettingsToListaGenericaItem(
    impressora: IPrinterSettings
  ): IListaGenericaItem {
    const lista = {
      id_lista: this.impressoraIdListaGenerica,
      valor: impressora.valor,
      valor2: JSON.stringify(impressora.valor2),
    } as IListaGenericaItem;

    if (impressora.id) {
      lista.id = impressora.id;
    }
    return lista;
  }

  getBack() {
    window.history.back();
  }

  salvar() {
    this.ordemProducaoService
      .updateOrdemProducao(this.ordemProducao)
      .subscribe({
        next: (ordemProducao) => {
          this.ordemProducao.ordem_producao_items?.forEach((item) => {
            const regex = /<p>(.*?)<\/p>/g;
            if (item.observacao && regex.exec(item.observacao) == null)
              item.observacao = '<p>' + item.observacao + '</p>';
          });
        },
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao atualizar ordem de produção - ' + error.error,
          });
        },
        complete: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'A ordem de produção foi atualizada.',
          });
        },
      });
  }

  onEditorModelChange(editor: Quill, content: string, index: number) {
    const contents = editor.clipboard.convert({ html: content });
    editor.setContents(contents);
  }

  gerarEtiquetas() {
    const etiquetas = this.ordemProducao.ordem_producao_items?.map(
      (item, index) => {
        this.ordemProducao.createdAt = new Date(this.ordemProducao.createdAt!);
        return {
          Orçamento: this.ordemProducao.orcamento?.id,
          OP: this.ordemProducao.id,
          Cliente: this.ordemProducao.orcamento?.pessoa?.nome,
          Item: index + 1,
          Quantidade: item.quantidade,
          Material: `${item.produto?.nome} - ${item.descricao} - ${Number(
            item.orcamento_item?.largura || 0
          ).toFixed(0)}x${Number(item.orcamento_item?.altura || 0).toFixed(
            0
          )}mm ${item.quantidade}PC`,
          Data:
            this.ordemProducao.createdAt?.getDate() +
            '/' +
            (this.ordemProducao.createdAt!.getMonth() + 1) +
            '/' +
            this.ordemProducao.createdAt?.getFullYear(),
          RIR: item.id_rir,
          Processo: this.concatenarProcessosString(
            item.ordem_producao_item_processos!
          ),
        };
      }
    );

    const ws = xlsx.utils.json_to_sheet(etiquetas!);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Etiquetas');
    xlsx.writeFile(wb, 'etiquetas.xlsx');
  }

  concatenarProcessosString(processos: IOrdemProducaoItemProcesso[]) {
    let processosString = '';
    processos.forEach((item) => {
      processosString = processosString + item.processo + ', ';
    });
    return processosString.slice(0, -2);
  }

  searchRir(item: IOrdemProducaoItem) {
    if (this.ordemProducao.orcamento?.pessoa && item.produto)
      this.RIRService.getRIRsByPessoaAndProduto(
        this.ordemProducao.orcamento?.pessoa.id!,
        item.produto.id!
      )
        .pipe(debounceTime(500), distinctUntilChanged())
        .subscribe({
          next: (response) => {
            console.log(response);
            this.rirs = response;
          },
          error: (error) => {
            console.error(error);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao buscar RIRs - ' + error.error,
            });
          },
        });
  }

  sortOrdemProducaoItems(ordemProducao: IOrdemProducao) {
    ordemProducao.orcamento?.orcamento_items?.sort((a, b) => {
      if (a.descricao && b.descricao) {
        if (a.descricao < b.descricao) {
          return -1;
        }
        if (a.descricao > b.descricao) {
          return 1;
        }
      }
      return 0;
    });
    ordemProducao.ordem_producao_items?.sort((a, b) => {
      if (a.descricao && b.descricao) {
        if (a.descricao < b.descricao) {
          return -1;
        }
        if (a.descricao > b.descricao) {
          return 1;
        }
      }
      return 0;
    });

    return ordemProducao;
  }

  toggleEtiquetas() {
    this.etiquetas = !this.etiquetas;
  }

  toggleImpressoraDetalhes() {
    this.impressoraDetalhes = !this.impressoraDetalhes;
  }

  setSizeStyleStringBuilder(size: number) {
    if (size > 0) return size + 'mm';
    else return 'auto';
  }

  adjustFontSize(): void {
    if (this.cardInsideContainer) {
      let fontSize = 5; // Starting font size
      const containers = this.cardInsideContainer.toArray();
      // Loop through all containers and adjust font size

      if (containers.length > 0) {
        for(let container of containers){
          const containerElement: HTMLDivElement = container.nativeElement;
          const containerElementParent: HTMLElement = containerElement.parentElement!;
          const containerElementParent2: HTMLElement = containerElementParent.parentElement!;
          const containerElementParent3: HTMLElement = containerElementParent2.parentElement!;
          const containerElementParent4: HTMLElement = containerElementParent3.parentElement!;
          const containerElementParent5: HTMLElement = containerElementParent4.parentElement!;

          containerElement.style.fontSize = `${fontSize}mm`;
          // Reduce font size until the text fits
          while (
            containerElementParent5.offsetHeight < containerElement.offsetHeight ||
            containerElementParent5.offsetWidth < containerElement.offsetWidth
          ) {
            fontSize-= 0.1;
            containerElement.style.fontSize = `${fontSize}mm`;
          }
        }

      }
    }
  }
}
