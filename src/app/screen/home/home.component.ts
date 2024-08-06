import { UsuarioService } from 'src/app/authentication/usuario.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { MessageService } from 'primeng/api';
import { consoleLogDev } from 'src/app/utils/consoleLogDev';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  public menuItems: MenuItem[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.usuario$.subscribe((usuario) => {
      this.buildMenu();
    });

  }

  async buildMenu(){
    this.menuItems = [
      {
        icon: 'favicon-icon',
        routerLink: 'dashboard',
      },
      {
        label: 'Cadastro',
        items: [
          {
            label: 'Contatos',
            routerLink: 'contatos',
            visible: await this.usuarioService.verifyAccess(['contato', 'findAll']),
          },
          {
            label: 'Orcamentos',
            routerLink: 'orcamentos',
            visible: await this.usuarioService.verifyAccess(['orcamento', 'findAll'])
          },
          {
            label: 'Ordens de Produção',
            routerLink: 'ordensproducao',
            visible: await this.usuarioService.verifyAccess(['ordemProducao', 'findAll'])
          },
          {
            label: 'Pedidos de Compra',
            routerLink: 'pedidoscompras',
            visible: await this.usuarioService.verifyAccess(['pedidoCompra', 'findAll'])
          },
          {
            label: 'Pessoas',
            routerLink: 'pessoas',
            visible: await this.usuarioService.verifyAccess(['pessoa', 'findAll'])
          },
          {
            label: 'Produtos',
            routerLink: 'produtos',
            visible: await this.usuarioService.verifyAccess(['produto', 'findAll'])
          },
          {
            label: 'Registro de Inspeção e Recebimento',
            routerLink: 'rir',
            visible: await this.usuarioService.verifyAccess(['rir', 'findAll'])
          },
        ],
      },
      {
        label: 'Indicadores',
        items: [
          {
            label: 'Indice Qualidade Fornecedor',
            routerLink: 'iqf',
            visible: true
          },
        ],
      },
      {
        label: 'Relatórios',
        items: [
          {
            label: 'Relatório de não conformidade',
            routerLink: 'rnc',
            visible: true
          },
        ],
      },
      {
        label: 'Configurações',
        items: [
          {
            label: 'Configurações',
            routerLink: 'listagenerica',
            visible: true
          },
          {
            label: 'Arquivos',
            routerLink: 'arquivos',
            visible: true
          },
          {
            label: 'Usuarios',
            routerLink: 'usuarios',
            visible: true
          },
        ],
      },
    ];
  }
}
