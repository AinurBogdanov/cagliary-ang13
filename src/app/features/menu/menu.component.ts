import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Page } from 'src/app/core/data/interfaces/page';
import { Product } from 'src/app/core/data/interfaces/product';
import { pagesData } from 'src/app/core/data/pages';
import { ApiService } from 'src/app/core/services/api.service';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  products!: Product[][];

  pages: Page[];

  category: string = '';
  title: string = '';
  arrayIndex: number = 0;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private apiService: ApiService
  ) {
    this.pages = pagesData;
  }

  ngOnInit(): void {
    this.apiService.getProducts().subscribe((products) => {
      this.products = products;
    });

    this.route.paramMap.subscribe((params) => {
      this.category = params.get('category') || '';
      this.loadMenuData(this.category);
    });
  }
  addToCart(pizza: Product, currentPageIndex: number) {
    this.cartService.addPizza(pizza, currentPageIndex);
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
