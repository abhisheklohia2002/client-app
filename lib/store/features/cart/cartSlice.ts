import { IProduct, Topping } from "@/types/constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICartItem {
  product: IProduct;
  chooseConfiguration: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    priceConfiguration: any;
    topping: Topping[];
  };
  qty: number;
  totalPrice?: number;
}

export interface ICartState {
  cartItems: ICartItem[];
}
export interface IProductId {
  id: string;
}
const initialState: ICartState = { cartItems: [] };

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<ICartItem, "qty">>) => {
      const existingItem = state.cartItems.find(
        (elem) => elem.product._id === action.payload.product._id,
      );
      if (existingItem) {
        existingItem.qty += 1;
      } else {
        state.cartItems.push({ ...action.payload, qty: 1 });
      }
    },
    incrementCart: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find(
        (x) => x.product._id === action.payload,
      );
      if (item) item.qty += 1;
    },
    decrementCart: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find(
        (x) => x.product._id === action.payload,
      );
      if (item) {
        item.qty -= 1;
        if (item.qty <= 0) {
          state.cartItems = state.cartItems.filter(
            (x) => x.product._id !== action.payload,
          );
        }
      }
    },
    deleteProductById: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (x) => x.product._id !== action.payload,
      );
    },
  },
});

export const { addToCart, decrementCart, incrementCart, deleteProductById } =
  cartSlice.actions;
export default cartSlice.reducer;
