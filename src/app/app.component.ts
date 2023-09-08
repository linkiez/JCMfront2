import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

declare var dataLayer: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'JCMfront2';
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Push to Google Tag Manager data layer on route change
        dataLayer.push({
          event: 'ngRouteChange',
          attributes: {
            route: event.urlAfterRedirects,
          },
        });
      }
    });
  }
}
