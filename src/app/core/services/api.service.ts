import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../data/interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrlApi: string =
    'https://pizza-backend.free.beeceptor.com';
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[][]> {
    // return this.http.get<Product[][]>(`${this.baseUrlApi}/products`);
  }
  getPizzaData(): Observable<Product[]> {
    // return this.http.get<Product[]>(`${this.baseUrlApi}/pizzas`);
  }
}
