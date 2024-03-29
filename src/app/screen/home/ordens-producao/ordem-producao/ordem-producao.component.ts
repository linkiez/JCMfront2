import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  OrdemProducao,
  OrdemProducaoItem,
  OrdemProducaoItemProcesso,
} from 'src/app/models/ordem-producao';
import { OrdemProducaoService } from 'src/app/services/ordem-producao.service';
import { Quill } from 'quill';
import * as xlsx from 'xlsx';
import { RIRService } from 'src/app/services/rir.service';
import { RIR } from 'src/app/models/rir';
import { debounce, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-ordem-producao',
  templateUrl: './ordem-producao.component.html',
  styleUrls: ['./ordem-producao.component.css'],
})
export class OrdemProducaoComponent implements OnInit {
  ordemProducao: OrdemProducao = {};

  rirs: RIR[] = [];

  constructor(
    private ordemProducaoService: OrdemProducaoService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router,
    private RIRService: RIRService
  ) {}

  ngOnInit() {
    this.getOrdemProducao();
  }

  getOrdemProducao() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.ordemProducaoService.getOrdemProducao(id).subscribe({
      next: (ordemProducao) => {
        this.ordemProducao = this.sortOrdemProducaoItems(ordemProducao);
        // this.ordemProducao.ordem_producao_items?.forEach((item) => {
        //   item.observacao = '<p>' + item.observacao + '<p>';
        // });
        console.log(ordemProducao);
      },
      error: (error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao buscar ordem de produção - ' + error.error,
        });
      },
      complete: () => {},
    });
  }

  getBack() {
    window.history.back();
  }

  salvar() {
    this.ordemProducaoService
      .updateOrdemProducao(this.ordemProducao)
      .subscribe({
        next: (ordemProducao) => {
          this.ordemProducao = this.sortOrdemProducaoItems(ordemProducao);
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

  consolelog(content: any) {
    console.log(content);
    console.log(this.ordemProducao);
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
          ).toFixed(0)}x${Number(
            item.orcamento_item?.altura || 0
          ).toFixed(0)}mm ${item.quantidade}PC`,
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

  concatenarProcessosString(processos: OrdemProducaoItemProcesso[]) {
    let processosString = '';
    processos.forEach((item) => {
      processosString = processosString + item.processo + ', ';
    });
    return processosString.slice(0, -2);
  }

  searchRir(item: OrdemProducaoItem) {
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

  sortOrdemProducaoItems(ordemProducao: OrdemProducao) {
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
}
