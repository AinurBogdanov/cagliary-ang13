import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  hideBackground = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.hideBackground = event.url !== '/';
        }
      });
    });
  }

  ngOnInit(): void {}
}
