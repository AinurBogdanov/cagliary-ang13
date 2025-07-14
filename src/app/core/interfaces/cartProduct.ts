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
  saucesIds: number[];
  quantity: number;
}
