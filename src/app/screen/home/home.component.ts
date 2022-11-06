import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService],
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
        },
        {
          label: 'Ordens de Produção',
        },
        {
          label: 'Pedidos de Compra',
          routerLink: 'pedidoscompras'
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
        },
      ],
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
