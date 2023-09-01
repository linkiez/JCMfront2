import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('toggleMenu', [
      state('open', style({
        opacity: 1,
        transform: 'scale(1)'
      })),
      state('closed', style({
        opacity: 0,
        transform: 'scale(0.95)'
      })),
      transition('open <=> closed', [
        animate('0.1s')
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit, OnDestroy {
  isOpen: boolean = false;
  navbar: boolean = false;
  navigation = [
    { name: 'Home', href: '/' },
    { name: 'Quem Somos', href: '/quem-somos' },
    { name: 'Produtos', href: '/produtos' },
    { name: 'Serviços', href: '/servicos' },
    { name: "Trabalhe Conosco", href: '/trabalhe.html' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contato', href: '/contato' }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    window.addEventListener('scroll', this.changeBackground, true);
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.changeBackground, true);
  }

  changeBackground = (): void => {
    if (window.scrollY >= 30) {
      this.navbar = true;
    } else {
      this.navbar = false;
    }
  }

  toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }

  isCurrentRoute(route: string): boolean {
    return this.router.url === route;
  }
}
