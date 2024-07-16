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

      // Retrieve the current route's title and id parameter
      const routeData = route.snapshot.data;
      const id = route.snapshot.paramMap.get('id');
      const baseTitle = routeData['title'] ? routeData['title'] : '';
      const pageTitle = `${baseTitle}${id ? ` ${id}` : ''} | JCM Metais | Corte e Dobra de Chapas | Americana, SP`;

      this.titleService.setTitle(pageTitle);
    });
  }
}
