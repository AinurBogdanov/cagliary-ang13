import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss'],
})
export class PageTitleComponent implements OnInit {
  @Input() title = '';
  @Input() showSearch: boolean = false;
  breadCrumb = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const url = this.router.url;
    const paths = url.split('/');
    this.breadCrumb = paths[paths.length - 1];
  }
}
