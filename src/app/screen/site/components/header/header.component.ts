import { Component, OnInit, HostListener, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { navigation } from '../../navigation';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
        animate('0.2s')
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit, OnDestroy {
  isOpen: boolean = false;
  navbar: boolean = false;
  navigation = navigation;

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
