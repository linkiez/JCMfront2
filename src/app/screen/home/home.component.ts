import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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

  constructor() { }

  ngOnInit(): void {
  }

}
