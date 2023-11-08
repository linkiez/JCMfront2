import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { filter } from 'rxjs/operators';

declare var dataLayer: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent  {

  constructor(
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    , private gtmService: GoogleTagManagerService
  ) {
    this.changeTitleOnNavigation();
  }

  private changeTitleOnNavigation(): void {
    this.router.events.pipe(
      // Filter out only NavigationEnd events
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      let route = this.activatedRoute;
      while (route.firstChild) {
        route = route.firstChild;
      }
      // Retrieve the current route's title and set it
      const pageTitle = `${route.snapshot.data['title']?route.snapshot.data['title'] + " | ":""}JCM Metais | Corte e Dobra de Chapas | Americana, SP`;
      this.titleService.setTitle(pageTitle);

      if (event instanceof NavigationEnd) {
        this.gtmService.pushTag({ event: 'pageView', pagePath: event.urlAfterRedirects });
      }
    });
  }
}
