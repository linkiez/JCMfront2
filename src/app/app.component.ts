import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent  {

  constructor(
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.changeTitleOnNavigation();
  }

  private changeTitleOnNavigation(): void {
    this.router.events.pipe(
      // Filter out only NavigationEnd events
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      let route = this.activatedRoute;
      while (route.firstChild) {
        route = route.firstChild;
      }
      // Retrieve the current route's title and set it
      const pageTitle = `${route.snapshot.data['title']?route.snapshot.data['title'] + " | ":""}Refilauq - Sistema de Gestão de Qualidade e Produção`;
      this.titleService.setTitle(pageTitle);
    });
  }
}
