import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
} from '@angular/core';
import { recProducts } from 'src/app/core/data/backData/rec-data';
import { sauces } from 'src/app/core/data/backData/sauces-data';
import { Sauce } from 'src/app/core/data/interfaces/sauce';
import Swiper, { Navigation, Pagination } from 'swiper';

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

  ngAfterViewInit() {
    new Swiper('.swiper1', {
      direction: 'horizontal',
      slidesPerView: 6,
      spaceBetween: 12,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper1-button-next',
        prevEl: '.swiper1-button-prev',
      },
    });
    new Swiper('.swiper2', {
      direction: 'horizontal',
      slidesPerView: 3,
      spaceBetween: 12,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper2-button-next',
        prevEl: '.swiper2-button-prev',
      },
    });
  }

  additionSauceChange(sauce: Sauce, increment: number) {
    const sauceAndIncrement = { sauce, increment };
    this.onAdditionSauce.emit(sauceAndIncrement);
  }
}
