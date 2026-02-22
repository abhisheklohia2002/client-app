import { IProduct, Topping } from "@/types/constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICartItem {
  product: IProduct;
  chooseConfiguration: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    priceConfiguration:any ;
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
      state.cartItems.push({ ...action.payload, qty: 1 });
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
