import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../data/interfaces';

@Pipe({
  name: 'formatData'
})
export class FormatDataPipe implements PipeTransform {
  translit: {[key: string]: string} = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
    'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm',
    'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
    'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch',
    'ъ': '', 'ы': 'y', 'ь': '-', 'э': 'e', 'ю': 'ju', 'я': 'ja'
  };

  transform(dishes: Product[]): Product[] {

    
    return dishes.map(dish => {
      const newDish = { ...dish };
      
      const originalImages = { ...dish.images };
      
      const transformedName = this.transformWord(dish.name);
      const newMainImage = transformedName + '-main';
      const newPreviewImage = transformedName + '-preview';
      
      newDish.images = {
        ...originalImages,       // Сохраняем все оригинальные изображения
        main: newMainImage,      // Обновляем main
        preview: newPreviewImage // Обновляем preview
      };
      
      const activeSize = dish.sizes.filter(size => size.active && size.available)
    
      newDish.price = activeSize[0].price 
        
      return newDish;
    });
  };
  

  transformWord(word: string) {
   return word.toLowerCase()
    .split('')
    .map((char: string) => this.translit[char] || char)
    .join('')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/-+/g, '-')
  }

}
