import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { pagesData } from 'src/app/core/data/pages';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductService } from '../../core/services/product.service';
import { FormatDataPipe } from '../../core/pipes/format-data.pipe';
import type { Page } from 'src/app/core/interfaces/page';
import type {
  BackendProduct,
  ProductWithCategory,
  size,
} from 'src/app/core/interfaces/product';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  products$: Observable<BackendProduct[][]>;
  allProducts: ProductWithCategory[] = [];
  filteredProducts: ProductWithCategory[] | null = null;
  pages: Page[];

  category: string = '';
  title: string = '';
  arrayIndex: number = 0;

  constructor(
    private formatDataPipe: FormatDataPipe,
    private route: ActivatedRoute,
    private cartService: CartService,
    private productService: ProductService
  ) {
    this.products$ = this.productService.products$;
    this.pages = pagesData;
  }

  ngOnInit() {
    this.products$.subscribe((products) => {
      this.allProducts = this.formatDataPipe.transform(products);
    });

    this.route.paramMap.subscribe((params) => {
      this.category = params.get('category') || '';
      this.loadMenuData(this.category);
    });
  }
  addToCart(pizza: BackendProduct, currentPageIndex: number) {
    this.cartService.addPizza(pizza, currentPageIndex);
  }

  choseSize(sizeAndID: { size: size; productId: string }) {
    this.productService.changeSize(sizeAndID.size, sizeAndID.productId);
  }

  searchProducts(value: string) {
    const query = value.toLowerCase();
    if (!query) {
      this.filteredProducts = null;
      return;
    }
    const queryWord = query.split(/\s+/).filter((q) => q.length > 0);

    function scoreProduct(productName: string): number {
      let score = 0;

      for (const word of queryWord) {
        if (!word) continue;
        if (productName.toLowerCase().includes(word)) {
          score += word.length;
        }
      }
      return score;
    }

    const filteredProducts = this.allProducts;
    this.allProducts.filter((product) => {
      return product.name.toLowerCase().includes(query);
    });

    filteredProducts.sort(
      (a, b) => scoreProduct(b.name) - scoreProduct(a.name)
    );

    this.filteredProducts = filteredProducts;
  }

  private loadMenuData(category: string) {
    const page = this.pages.find((page) => page.category === category);
    if (page !== undefined) {
      this.title = page.title;
      this.arrayIndex = page.arrayIndex;
    }
  }
}
