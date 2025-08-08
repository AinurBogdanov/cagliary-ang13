import {
  AfterViewInit,
  Component,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { recProducts } from 'src/app/core/data/rec-data';
import { sauces } from 'src/app/core/data/sauces-data';
import { Sauce } from 'src/app/core/interfaces/sauce';
import { CartService } from 'src/app/core/services/cart.service';
import Swiper, { Navigation, Pagination } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

Swiper.use([Navigation, Pagination]);

@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.scss'],
})
export class Sliders implements AfterViewInit {
  saucesData = sauces;
  rec = recProducts;
  @Output() onAdditionSauce = new EventEmitter();
  @Output() addProduct = new EventEmitter();

  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;

  constructor(private cartService: CartService) {
    this.cartService.getCart().subscribe((cart) => {
      this.saucesData = this.saucesData.map((sauce) => {
        const foundSauce = cart.additionalSauces.find(
          (additionSauce: Sauce) => {
            return additionSauce.id === sauce.id;
          }
        );
        if (foundSauce) {
          return foundSauce;
        } else {
          sauce.count = 0;
          return sauce;
        }
      });
    });
  }

  config = {
    slidesPerView: 6,
    spaceBetween: 12,
    navigation: {
      nextEl: '.custom-swiper-button-next',
      prevEl: '.custom-swiper-button-prev',
    },
    loop: true,
  };

  ngAfterViewInit() {}

  additionSauceChange(sauce: Sauce, increment: number) {
    const sauceAndIncrement = { sauce, increment };
    this.onAdditionSauce.emit(sauceAndIncrement);
  }
  onAddProduct(productId: number) {
    //id не корректен
  }
}
// new Swiper('.swiper1', {
//       direction: 'horizontal',
//       slidesPerView: 6,
//       spaceBetween: 12,
//       loop: true,
//       pagination: {
//         el: '.swiper-pagination',
//         clickable: true,
//       },
//       navigation: {
//         nextEl: '.swiper1-button-next',
//         prevEl: '.swiper1-button-prev',
//       },
//     });
//     new Swiper('.swiper2', {
//       direction: 'horizontal',
//       slidesPerView: 3,
//       spaceBetween: 12,
//       loop: true,
//       pagination: {
//         el: '.swiper-pagination',
//         clickable: true,
//       },
//       navigation: {
//         nextEl: '.swiper2-button-next',
//         prevEl: '.swiper2-button-prev',
//       },
//     });
