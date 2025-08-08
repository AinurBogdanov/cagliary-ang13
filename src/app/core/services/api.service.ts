import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendProduct } from 'src/app/core/interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ApiService implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit() {}

  getProducts(): Observable<BackendProduct[][]> {
    return this.http.get<BackendProduct[][]>(
      'https://pizza-backend3.free.beeceptor.com/products'
      // `https://433e2e4e-a634-4095-8eca-df41aa00b4dc.mock.pstmn.io/products`
    );
  }

  login(formData: any) {
    return this.http.post(
      'https://pizza-backend3.free.beeceptor.com/login',
      formData
    );
  }
  sentOrder(order: any) {
    return this.http.post(
      'https://pizza-backend3.free.beeceptor.com/order',
      order
    );
  }
}
