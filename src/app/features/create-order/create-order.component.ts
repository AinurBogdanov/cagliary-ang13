import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { error } from 'console';
import { BehaviorSubject } from 'rxjs';
import { PaymentMethod } from 'src/app/core/data/enums/paymentMethod';
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

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.createForm();
  }

  ngOnInit(): void {}

  createForm() {
    this.orderForm = this.fb.group({
      phone: ['', [Validators.required, Validators.minLength(10)]],
      street: ['', [Validators.required]],
      house: ['', [Validators.required]],
      building: [''],
      apartment: [''],
      entrance: [''],
      floor: [''],
      comment: [''],
      change: [''],
      paymentMethod: ['cash', Validators.required],
    });
  }

  submitForm() {
    if (this.orderForm.valid && this.familiarized.value) {
      this.apiService.sentOrder(this.orderForm.value).subscribe({
        next: (response) => {
          console.log('Успешно отправлено:', response);
        },
        error: (error) => {
          console.log('Ошибка', error);
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
