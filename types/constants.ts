type Product = {
  id: string;
  name: string;
  desciption: string;
  image: string;
  price: number;
};



export type Topping = {
  _id: string;
  name: string;
  image: string;
  price: number;
  isAvailable: boolean;
};



export interface ITenants{
    id:number,
    name:string,
    address:string,
    updatedAt?:string,
    createdAt?:string
}

export  interface IProduct {
  _id: string;
  name: string;
  description: string;
  image: string;

  priceConfiguration?: PriceConfiguration;

  attributes: ProductAttribute[];

  tenantId: string;
  categoryId: string;

  isPublished: boolean;

  createdAt: string;
  updatedAt: string;

  __v: number;

  category: unknown[]; 
}

export interface PriceConfiguration {
  [key: string]: PriceOption;
}

export interface PriceOption {
  _id: string;
  priceType: "base" | "aditional";
  availableOptions: {
    [optionName: string]: number;
  };
}

export interface ProductAttribute {
  _id: string;
  name: string;
  value: string | boolean;
}