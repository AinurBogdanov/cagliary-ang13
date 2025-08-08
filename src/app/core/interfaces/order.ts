import { Product } from './product';

export interface Order {
  orderId: string;
  items: Product[];
  promoDrink: 'Cola';
}

// {
//         orderId: '',
//         products: [
//           {
//             productId: 123,
//             quantity: 2,
//             chosenSauceId: 3,
//           },
//         ],
//         additionalSaucesIds: [1, 2, 3, 4],
//         chosenPromoId: 1,
//         chosenDrink: '',
//       }
