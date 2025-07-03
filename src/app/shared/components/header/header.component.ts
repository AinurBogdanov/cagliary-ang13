import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  hideBackgound = false;

  constructor(private router: Router) { 
    this.router.events.subscribe(event => {
      this.router.events.subscribe(event => {
        if(event instanceof NavigationEnd) {
          this.hideBackgound = event.url !== '/'
        }
      })
    });
  }

  ngOnInit(): void {
  }

}
