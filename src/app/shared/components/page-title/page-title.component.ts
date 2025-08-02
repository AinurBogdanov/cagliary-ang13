import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
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
  @Output() searchChange = new EventEmitter<string>();
  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const url = this.router.url;
    const paths = url.split('/');
    this.breadCrumb = paths[paths.length - 1];

    if (this.breadCrumb === 'order') {
    }
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchChange.emit(value);
  }
  focusInput() {
    this.searchInput.nativeElement.focus();
  }
  clearInput() {
    this.searchInput.nativeElement.value = '';
    this.searchChange.emit('');
  }
}
