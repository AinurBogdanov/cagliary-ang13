import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  familiarized = new BehaviorSubject<boolean>(false);
  passwordVisible = new BehaviorSubject<boolean>(false);

  constructor() {}

  ngOnInit(): void {}
  submitForm(val: any) {
    console.log(val);
  }
  toggleFamiliarized() {
    this.familiarized.next(!this.familiarized.value);
  }
  togglePasswordVisibility() {
    this.passwordVisible.next(!this.passwordVisible.value);
  }
  formatPhone(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    if (!value.startsWith('7')) value = '7' + value;
    input.value = `+${value.slice(0, 1)} ${value.slice(1, 4)}...`;
  }
}
