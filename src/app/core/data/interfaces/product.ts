export interface Product {
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
export interface doughType {
  type: string;
  active: boolean;
  available: boolean;
}

export interface size {
  size: string;
  weight: string;
  price: number;
  active: boolean;
  available: boolean;
}
