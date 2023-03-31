import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdemProducao } from 'src/app/models/ordem-producao';
import { OrdemProducaoService } from 'src/app/services/ordem-producao.service';
import {Quill} from 'quill';

@Component({
  selector: 'app-ordem-producao',
  templateUrl: './ordem-producao.component.html',
  styleUrls: ['./ordem-producao.component.css'],
})
export class OrdemProducaoComponent implements OnInit {
  ordemProducao: OrdemProducao = {};

  constructor(
    private ordemProducaoService: OrdemProducaoService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getOrdemProducao();
  }

  getOrdemProducao() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.ordemProducaoService.getOrdemProducao(id).subscribe({
      next: (ordemProducao) => {
        console.log(ordemProducao);
        this.ordemProducao = ordemProducao;

        this.ordemProducao.ordem_producao_items?.forEach((item)=>{
          item.observacao = '<p>'+item.observacao+'<p>'
        })
      },
      error: (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: `${error.status} - ${error.statusText} - ${error.error}`,
        });
      },
      complete: () => {},
    });
  }

  getBack() {
    this.router.navigate(['home/ordemproducao']);
  }

  salvar() {
    this.ordemProducaoService
      .updateOrdemProducao(this.ordemProducao)
      .subscribe({
        next: (ordemProducao) => {
          this.ordemProducao = ordemProducao;
        },
        error: (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: `${error.status} - ${error.statusText} - ${error.error}`,
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

  onEditorModelChange(editor: Quill, content: string, index: number){
    const contents = editor.clipboard.convert({html: content});
    editor.setContents(contents);
  }

  consolelog(content:any){
    console.log(content)
    console.log(this.ordemProducao)
  }
}
