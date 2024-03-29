import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  public menuItems: MenuItem[] = [
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
        },
        {
          label: 'Orcamentos',
          routerLink: 'orcamentos',
        },
        {
          label: 'Ordens de Produção',
          routerLink: 'ordensproducao',
        },
        {
          label: 'Pedidos de Compra',
          routerLink: 'pedidoscompras',
        },
        {
          label: 'Pessoas',
          routerLink: 'pessoas',
        },
        {
          label: 'Produtos',
          routerLink: 'produtos',
        },
        {
          label: 'Registro de Inspeção e Recebimento',
          routerLink: 'rir',
        },
      ],
    },
    {
      label: 'Indicadores',
      items: [
        {
          label: 'Indice Qualidade Fornecedor',
          routerLink: 'iqf',
        },
      ],
    },
    {
      label: 'Relatórios',
      items: [
        {
          label: 'Relatório de não conformidade',
          routerLink: 'rnc',
        },
      ],
    },
    {
      label: 'Configurações',
      items: [
        {
          label: 'Listas Genericas',
          routerLink: 'listagenerica',
        },
        {
          label: 'Arquivos',
          routerLink: 'arquivos',
        },
        {
          label: 'Usuarios',
          routerLink: 'usuarios',
        },
      ],
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
