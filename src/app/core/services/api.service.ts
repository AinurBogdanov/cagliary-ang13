import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../data/interfaces/product';
import { error } from 'console';

@Injectable({
  providedIn: 'root',
})
export class ApiService implements OnInit {
  private readonly baseUrlApi: string =
    'https://pizza-backend.free.beeceptor.com';
  // https://pizza-backend3.free.beeceptor.com // 2 RULES
  // 'https://433e2e4e-a634-4095-8eca-df41aa00b4dc.mock.pstmn.io';
  // 'https://projectpizzasecondback.free.beeceptor.com';
  // '';

  products!: Product[][];

  constructor(private http: HttpClient) {
    // this.getProducts().subscribe((products) => {
    //   this.products = products;
    // });
  }

  ngOnInit(): void {}

  getProducts(): Observable<Product[][]> {
    return this.http.get<Product[][]>(`${this.baseUrlApi}/products`);
  }

  login(formData: any) {
    this.http
      .post('https://pizza-backend3.free.beeceptor.com/login', formData)
      .subscribe({
        next: (res) => console.log('registered', res),
        error: (error) => console.error(error),
      });
  }
  sentOrder(order: any) {
    this.http
      .post('https://pizza-backend3.free.beeceptor.com/order', order)
      .subscribe((res) => console.log(res));
  }
}

// {
//         orderId: 'someIdssss',
//         products: [
//           {
//             productId: 123,
//             quantity: 2,
//             chosenSauceId: 3,
//           },
//         ],
//         additionalSaucesIds: [1, 2, 3, 4],
//         chosenPromoId: 1,
//         chosenDrink: '',
//       }
