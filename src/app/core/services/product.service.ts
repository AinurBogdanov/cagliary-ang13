import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';
import type { BackendProduct, size } from 'src/app/core/interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productsSubject = new BehaviorSubject<BackendProduct[][]>([]);
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
