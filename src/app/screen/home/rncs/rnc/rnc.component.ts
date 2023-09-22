import { RNCService } from './../../../../services/rnc.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { OrdemProducaoService } from './../../../../services/ordem-producao.service';
import { Component, OnInit } from '@angular/core';
import {
  OrdemProducao,
  OrdemProducaoItem,
} from 'src/app/models/ordem-producao';
import { Query } from 'src/app/models/query';
import { RNC, RNCItem } from 'src/app/models/rnc';
import { MessageService } from 'primeng/api';
import { v4 as uuidv4 } from 'uuid';
import { Produto } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/services/produto.service';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioServiceDB } from 'src/app/services/usuario.service';
import { trackByFunction } from 'src/app/utils/trackByFunction';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rnc',
  templateUrl: './rnc.component.html',
  styleUrls: ['./rnc.component.scss'],
})
export class RNCComponent implements OnInit {
  rnc: RNC = {
    status: 'Aberto',
    rnc_items: [],
    descricao: '',
    causa: '',
    acao_disposicao: null,
    acao_corretiva: '',
    acao_preventiva: '',
    acao_contencao: '',
    reclamacao_cliente: false,
    responsavel_analise: {},
  };

  ordensProducao: OrdemProducao[] = [];
  selectedOrdemProducao: OrdemProducao | undefined;
  selectedOrdemProducaoItem: OrdemProducaoItem[] | undefined;

  responsalveis_analise: Usuario[] = []

  incluirOPToggle: boolean = false;

  status: string[] = ['Aberto','Fechado'];

  produtos: Produto[] = [];

  classificacoes: string[] = [
    'Auditoria Externa',
    'Auditoria Interna',
    'Reclamação de Cliente',
    'Problema com Fornecedor',
    'Problema Interno',
    'Melhorias/Observações/OPMs das auditorias do SGQ',
  ]

  acoes_disposicao: [
    'Refugar',
    'Retrabalhar',
    'Reclassificar',
    'Aprovação Condicional',
    'Outros',
    null
  ] = [
    'Refugar',
    'Retrabalhar',
    'Reclassificar',
    'Aprovação Condicional',
    'Outros',
    null,
  ];

  trackByFunction = trackByFunction;

  constructor(
    private ordemProducaoService: OrdemProducaoService,
    private produtoService: ProdutoService,
    private messageService: MessageService,
    private usuarioService: UsuarioServiceDB,
    private RNCService: RNCService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.getRNC();
  }

  getRNC(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if(id!=0){
      this.RNCService.getRNC(id).subscribe({
        next: (rnc) => {
          this.rnc = rnc;
          console.log(rnc)
        },
        error: (error) => {
          console.error(error)
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Não foi possível carregar a RNC. - ' + error.error,
          })
        },
      });
    }
  }

  searchOrdemProducao(event: any) {
    const query: Query = {
      page: 0,
      pageCount: 10,
      searchValue: event.query,
      deleted: false,
    };

    this.ordemProducaoService
      .getOrdemProducoes(query)
      .pipe(
        debounceTime(500), // espera um tempo antes de começar
        distinctUntilChanged() // recorda a ultima pesquisa
      )
      .subscribe({
        next: (consulta) => {
          this.ordensProducao = consulta.ordemProducao;
        },
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao carregar as ordens de produção. - ' + error.error,
          });
        },
      });
  }

  selectOrdemProducao(id: any) {
    this.ordemProducaoService.getOrdemProducao(id).subscribe({
      next: (ordemProducao) => {
        ordemProducao.ordem_producao_items =
          ordemProducao.ordem_producao_items?.map((item: OrdemProducaoItem) => {
            item.key = uuidv4();
            return item;
          });
        this.selectedOrdemProducao = ordemProducao;
      },
      error: (error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao carregar a ordem de produção. - ' + error.error,
        });
      },
    });
  }

  includeRNCItems() {
    if ((this.selectedOrdemProducaoItem?.length ?? 0) < 1) return;

    for (let ordemProducaoItem of this.selectedOrdemProducaoItem ?? []) {
      const rncItem: RNCItem = {
        id_produto: ordemProducaoItem.id_produto,
        produto: ordemProducaoItem.produto!,
        quantidade: ordemProducaoItem.quantidade ?? 0,
        largura: ordemProducaoItem.orcamento_item?.largura ?? 0,
        altura: ordemProducaoItem.orcamento_item?.altura ?? 0,
        id_ordem_producao_item: ordemProducaoItem.id!,
        ordem_producao_item: ordemProducaoItem,
        observacao: ordemProducaoItem.observacao,
      };

      this.rnc.rnc_items?.push(rncItem);
    }

    this.incluirOPToggle = false;
    console.log(this.rnc);
  }

  searchProduto(event: any) {
    let query: Query = {
      page: 0,
      pageCount: 25,
      searchValue: event.query,
      deleted: false,
    };

    this.produtoService
      .getProdutos(query)
      .pipe(
        distinctUntilChanged(), // recorda a ultima pesquisa
        debounceTime(500) // espera um tempo antes de começar
      )
      .subscribe({
        next: (consulta) => (this.produtos = consulta.produtos),
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Error ao buscar produtos - ' + error.error,
          });
        },
      });
  }

  searchResponsavelAnalise(event: any) {
    let query: Query = {
      page: 0,
      pageCount: 25,
      searchValue: event.query,
      deleted: false,
    };

    this.usuarioService
      .getUsuarios(query)
      .pipe(
        distinctUntilChanged(), // recorda a ultima pesquisa
        debounceTime(500) // espera um tempo antes de começar
      )
      .subscribe({
        next: (consulta) => (this.responsalveis_analise = consulta.usuarios),
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Error ao buscar usuarios - ' + error.error,
          });
        },
      });
  }

  log() {
    console.log(this.rnc);
  }

  create(){
    this.RNCService.addRNC(this.rnc).subscribe({
      next: (rnc) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'RNC criada com sucesso!',
        });
        this.rnc = rnc;
        console.log(rnc)
      },
      error: (error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao criar a RNC. - ' + error.error,
        });
      },
    });
  }

  update(){
    this.RNCService.updateRNC(this.rnc).subscribe({
      next: (rnc) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'RNC atualizada com sucesso!',
        });
        this.rnc = rnc;
      },
      error: (error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao atualizar a RNC. - ' + error.error,
        });
      },
    });
  }
}
