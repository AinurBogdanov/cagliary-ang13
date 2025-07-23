import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  familiarized = new BehaviorSubject<boolean>(false);
  passwordVisible = new BehaviorSubject<boolean>(false);
  submitted: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  submitForm(form: NgForm) {
    this.submitted = true;
    console.log('clicked', form.valid);
    if (form.valid) {
      this.apiService.login(form.value);
    }
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
