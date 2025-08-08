import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaymentMethod } from 'src/app/core/interfaces/paymentMethod';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss'],
})
export class CreateOrderComponent implements OnInit {
  familiarized = new BehaviorSubject<boolean>(false);
  orderForm!: FormGroup;
  paymentMethods = PaymentMethod;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {
    this.createForm();
  }

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

  createForm() {
    this.orderForm = this.fb.group({
      phone: ['1111111111', [Validators.required, Validators.minLength(10)]],
      street: ['2', [Validators.required]],
      house: ['2', [Validators.required]],
      building: ['2'],
      apartment: ['2'],
      entrance: ['11'],
      floor: ['1'],
      comment: ['11'],
      change: ['11'],
      paymentMethod: ['cash', Validators.required],
    });
  }

  submitForm() {
    if (this.orderForm.valid && this.familiarized.value) {
      this.apiService.sentOrder(this.orderForm.value).subscribe({
        next: (response) => {
          this.openSnackBar('Заказ успешно отправлен!', 'Закрыть');
        },
        error: (error) => {
          this.showError('Возникла ошибка');
        },
      });
    }
  }

  selectPaymentMethod(method: PaymentMethod) {
    this.orderForm.patchValue({
      paymentMethod: method,
    });
  }

  toggleFamiliarized() {
    this.familiarized.next(!this.familiarized.value);
  }
}
