import { Sauce } from './sauce';

export interface cartProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  weight: string;
  images: {
    main: string;
    preview: string;
  };
  size: string;
  doughType: string;
  sauces: Sauce[];
  quantity: number;
  category: string;
}
