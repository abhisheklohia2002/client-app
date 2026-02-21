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