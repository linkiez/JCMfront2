import { Component } from '@angular/core';

import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'JCMfront2';

  public menuItems: MenuItem[] = [
    {
      label: 'Cadastro',
      items: [
        {
          label: 'Contatos',
        },
        {
          label: 'Fornecedores'
        },
        {
          label: 'Operadores',
        },
        {
          label: 'Orcamentos',
        },
        {
          label: 'Ordens de Produção',
        },
        {
          label: 'Pedidos de Compra',
        },
        {
          label: 'Pessoas',
        },
        {
          label: 'Produtos',
        },
        {
          label: 'Registro de Inspeção e Recebimento',
        },
        {
          label: 'Vendedores',
        }

      ],
    },
    {
      label: 'Configurações',
      items: [
        {
          label: 'Listas Genericas'
        },
        {
          label: 'Arquivos',
        },
        {
          label: 'Usuarios',
        }
      ]
    }
  ];
}
