import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { recProducts } from 'src/app/core/data/backData/rec-data';
import { sauces } from 'src/app/core/data/backData/sauces-data';
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
}
