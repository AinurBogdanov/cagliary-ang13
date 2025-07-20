import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../data/interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ApiService implements OnInit {
  private readonly baseUrlApi: string =
    'https://pizza-backend.free.beeceptor.com';

  products!: Product[][];

  constructor(private http: HttpClient) {
    this.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  ngOnInit(): void {}

  getProducts(): Observable<Product[][]> {
    return this.http.get<Product[][]>(`${this.baseUrlApi}/products`);
  }
}
