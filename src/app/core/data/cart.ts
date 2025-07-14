import { cartProduct } from '../interfaces/cartProduct';

export const cart: cartProduct[] = [
  {
    id: '178',
    name: 'Capriccio',
    description:
      'Сыр моцарелла, Соус "Барбекю", Соус "Кальяри", Пепперони, Овощи гриль, Бекон, Ветчина, Томаты черриX, ШампиньоныX',
    price: 740,
    weight: '980 гр',
    images: {
      main: 'https://cagliari.delivery/images/dishes/capriccio_1.jpg',
      preview: 'capriccio-preview',
    },
    size: '30 см',
    doughType: 'Традиционное',
    saucesIds: [8],
    quantity: 1,
  },
  {
    id: '32',
    name: 'XXXL',
    description:
      'Сыр моцарелла, Соус "1000 островов", Куриный рулет, Ветчина, Колбаски охотничьи, Бекон, Сервелат, Огурцы маринованные, Томаты черриX, МаслиныX, Лук маринованныйX',
    price: 880,
    weight: '1440 гр',
    images: {
      main: 'https://cagliari.delivery/images/dishes/xxxl_1.jpg',
      preview: 'xxxl-preview',
    },
    size: '60 см',
    doughType: 'Толстое',
    saucesIds: [1, 3, 6],
    quantity: 1,
  },
];

//  {
//     "id": "178",
//     "name": "Capriccio",
//     "description": "Сыр моцарелла, Соус \"Барбекю\", Соус \"Кальяри\", Пепперони, Овощи гриль, Бекон, Ветчина, Томаты черриX, ШампиньоныX",
//     "price": 740,
//     "weight": "980 гр",
//     "images": {
//         "main": "capriccio-main",
//         "preview": "capriccio-preview"
//     },

//     "nutrition": {},
//     "sizes": [
//         {
//             "size": "30 см",
//             "weight": "",
//             "price": 0,
//             "active": false,
//             "available": false
//         },
//         {
//             "size": "40 см",
//             "weight": "980гр",
//             "price": 740,
//             "active": true,
//             "available": true
//         },
//         {
//             "size": "60 см",
//             "weight": "2050гр",
//             "price": 1430,
//             "active": false,
//             "available": true
//         }
//     ],
//     "doughTypes": [
//         {
//             "type": "Традиционное",
//             "active": true,
//             "available": true
//         },
//         {
//             "type": "Толстое",
//             "active": false,
//             "available": true
//         }
//     ]
// }
