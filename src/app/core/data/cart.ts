import { Drink } from './enums/drinks';
import { Cart } from './interfaces/cart';
import { Product } from 'src/app/core/data/interfaces/fakeApi';

export const cart: Cart = {
  products: [],
  additionalSaucesIds: [],
  promo: Drink.cola,
  totalCost: 0,
};

// {
//       id: '178',
//       name: 'Capriccio',
//       description:
//         'Сыр моцарелла, Соус "Барбекю", Соус "Кальяри", Пепперони, Овощи гриль, Бекон, Ветчина, Томаты черриX, ШампиньоныX',
//       price: 740,
//       weight: '980 гр',
//       images: {
//         main: 'https://cagliari.delivery/images/dishes/capriccio_1.jpg',
//         preview: 'capriccio-preview',
//       },
//       size: '30 см',
//       doughType: 'Традиционное',
//       saucesIds: [8],
//       quantity: 1,
//     },
//     {
//       id: '32',
//       name: 'XXXL',
//       description:
//         'Сыр моцарелла, Соус "1000 островов", Куриный рулет, Ветчина, Колбаски охотничьи, Бекон, Сервелат, Огурцы маринованные, Томаты черриX, МаслиныX, Лук маринованныйX',
//       price: 880,
//       weight: '1440 гр',
//       images: {
//         main: 'https://cagliari.delivery/images/dishes/xxxl_1.jpg',
//         preview: 'xxxl-preview',
//       },
//       size: '60 см',
//       doughType: 'Толстое',
//       saucesIds: [1, 3, 6],
//       quantity: 1,
//     },
//   ]
