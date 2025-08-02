import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['custom-snackbar'],
    });
  }
  showError(message: string) {
    this.snackBar.open(message, 'Закрыть', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['error-snackbar'],
    });
  }

  submitForm(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.apiService.login(form.value).subscribe({
        next: (res) => {
          this.openSnackBar('Регистрация прошла успешно', 'Закрыть');
        },
        error: (error) => {
          this.showError('Возникла ошибка');
        },
      });
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
