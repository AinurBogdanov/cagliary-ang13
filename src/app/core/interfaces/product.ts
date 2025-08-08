import { Sauce } from './sauce';

interface BaseProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  weight: string;
  images: {
    main: string;
    preview: string;
  };
  nutrition: {};
  sizes: size[];
  doughTypes: doughType[];
}

export interface BackendProduct extends BaseProduct {}

export interface ProductWithCategory extends BaseProduct {
  category: string;
}

export interface cartProduct
  extends Omit<BaseProduct, 'sizes' | 'doughTypes' | 'nutrition'> {
  size: string;
  doughType: string;
  sauces: Sauce[];
  quantity: number;
  category: string;
}

export type doughType = {
  type: string;
  active: boolean;
  available: boolean;
};

export type size = {
  size: string;
  weight: string;
  price: number;
  active: boolean;
  available: boolean;
};
