import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../data/interfaces/fakeApi';

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
    ё: 'yo',
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

  transform(dishes: Product[]): Product[] {
    return dishes.map((dish) => {
      const newDish = { ...dish };

      const originalImages = { ...dish.images };
      const transformedName = this.transformWord(dish.name);
      if (transformedName === 'error') {
        console.log(dish.name, dish, 'error name');
      }
      const newMainImage = transformedName;

      newDish.images = {
        ...originalImages,
        main: newMainImage,
      };

      const activeSize = dish.sizes.filter(
        (size) => size.active && size.available
      );

      newDish.price = activeSize[0].price;

      return newDish;
    });
  }

  private transformWord(word: string) {
    if (word) {
      return word
        .toLowerCase()
        .split('')
        .map((char: string) => this.translit[char] || char)
        .join('')
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/-+/g, '-');
    } else {
      return 'error';
    }
  }
}
