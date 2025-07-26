import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, map } from 'rxjs';
import { Product, size } from '../data/interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productsSubject = new BehaviorSubject<Product[][]>([]);
  readonly products$ = this.productsSubject.asObservable();

  constructor(private apiService: ApiService) {
    this.apiService.getProducts().subscribe((products) => {
      this.productsSubject.next(products);
    });
  }

  changeSize(newSize: size, productId: string) {
    const updatedProducts = this.productsSubject.value.map((productsArray) =>
      productsArray.map((product) => {
        if (product.id !== productId) return product;
        console.log(product);
        return {
          ...product,
          sizes: product.sizes.map((size) => ({
            ...size,
            active: size.size === newSize.size,
          })),
        };
      })
    );

    this.productsSubject.next(updatedProducts);
  }
}
