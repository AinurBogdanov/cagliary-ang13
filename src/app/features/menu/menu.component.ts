import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Page } from 'src/app/core/data/interfaces/page';
import { Product, size } from 'src/app/core/data/interfaces/product';
import { pagesData } from 'src/app/core/data/pages';
import { ApiService } from 'src/app/core/services/api.service';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  // products!: Product[][];
  products$!: Observable<Product[][]>;

  pages: Page[];

  category: string = '';
  title: string = '';
  arrayIndex: number = 0;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private productService: ProductService
  ) {
    this.pages = pagesData;
  }

  ngOnInit(): void {
    this.products$ = this.productService.products$;

    this.route.paramMap.subscribe((params) => {
      this.category = params.get('category') || '';
      this.loadMenuData(this.category);
    });
  }
  addToCart(pizza: Product, currentPageIndex: number) {
    this.cartService.addPizza(pizza, currentPageIndex);
  }

  choseSize(sizeAndID: any) {
    this.productService.changeSize(sizeAndID.size, sizeAndID.productId);
  }

  private loadMenuData(category: string) {
    const page = this.pages.find((page) => page.category === category);
    if (page !== undefined) {
      this.title = page.title;
      this.arrayIndex = page.arrayIndex;
      console.log(this.arrayIndex);
    }
  }
}
