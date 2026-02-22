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
}

export interface ICartState {
  cartItems: ICartItem[];
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
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
