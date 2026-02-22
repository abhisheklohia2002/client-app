type Product = {
  id: string;
  name: string;
  desciption: string;
  image: string;
  price: number;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Classic Margherita Pizza",
    desciption: "Fresh mozzarella, tomato sauce, and basil on a crispy crust.",
    image: "/images/margherita.jpg",
    price: 299,
  },
  {
    id: "2",
    name: "Farmhouse Veggie Pizza",
    desciption: "Loaded with bell peppers, onions, mushrooms, and olives.",
    image: "/images/farmhouse.jpg",
    price: 399,
  },
  {
    id: "3",
    name: "Cheese Burst Burger",
    desciption: "Juicy patty stuffed with molten cheese and fresh veggies.",
    image: "/images/burger.jpg",
    price: 249,
  },
  {
    id: "4",
    name: "Peri Peri Fries",
    desciption: "Crispy fries tossed in spicy peri peri seasoning.",
    image: "/images/fries.jpg",
    price: 149,
  },
  {
    id: "5",
    name: "Chocolate Lava Cake",
    desciption: "Warm chocolate cake with a gooey molten center.",
    image: "/images/lava-cake.jpg",
    price: 199,
  },
];


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

  priceConfiguration: PriceConfiguration;

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