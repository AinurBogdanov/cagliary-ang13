import { Pipe, PipeTransform } from '@angular/core';
import { pagesData } from '../data/pages';
import type {
  BackendProduct,
  ProductWithCategory,
} from 'src/app/core/interfaces/product';

@Pipe({
  name: 'formatData',
})
export class FormatDataPipe implements PipeTransform {
  private readonly translit: { [key: string]: string } = {
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'g',
    д: 'd',
    е: 'e',
    ё: 'e',
    ж: 'zh',
    з: 'z',
    и: 'i',
    й: 'j',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    ф: 'f',
    х: 'h',
    ц: 'ts',
    ч: 'ch',
    ш: 'sh',
    щ: 'sch',
    ъ: '',
    ы: 'y',
    ь: '-',
    э: 'e',
    ю: 'ju',
    я: 'ja',
  };
  pagesData = pagesData;

  transform(dishes: BackendProduct[][]): ProductWithCategory[] {
    const result: ProductWithCategory[] = [];
    dishes.forEach((category, indexOfCategory) => {
      const page = this.pagesData.find(
        (page) => page.arrayIndex === indexOfCategory
      );
      category.forEach((product) => {
        if (page) {
          result.push({ ...product, category: page?.category });
        }
      });
    });

    return result.map((dish) => {
      const newDish = { ...dish };

      const originalImages = { ...dish.images };
      const transformedName = this.transformWord(dish.name);
      const newMainImage = transformedName;
      const newPreviewImage = transformedName;

      newDish.images = {
        ...originalImages, // Сохраняем все оригинальные изображения
        main: newMainImage, // Обновляем main
        preview: newPreviewImage, // Обновляем preview
      };

      const activeSize = dish.sizes.filter(
        (size) => size.active && size.available
      );

      newDish.price = activeSize[0].price;
      newDish.weight = activeSize[0].weight;

      return newDish;
    });
  }

  private transformWord(word: string) {
    return word
      .toLowerCase()
      .split('')
      .map((char: string) => this.translit[char] || char)
      .join('')
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/-+/g, '-')
      .replace(/-+$/, '');
  }
}
