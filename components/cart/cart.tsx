"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import CartProduct from "./CartProduct";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import {
  decrementCart,
  deleteProductById,
  ICartItem,
  incrementCart,
} from "@/lib/store/features/cart/cartSlice";
import { House, Mail, Phone, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Cart() {
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  const dispatch = useAppDispatch();

  const handleAddToCart = (id: string) => {
    console.log("handle Add");
    dispatch(incrementCart(id));
  };
  const handleDeleteToCart = (id: string) => {
    console.log("handle subtract");
    dispatch(decrementCart(id));
  };
  const handleDeleteProduct = (id: string) => {
    dispatch(deleteProductById(id));
  };

  const cartTotal = useMemo(() => {
    return cartItems.reduce(
      (acc, item) => acc + Number(item.totalPrice ?? 0) * (item.qty ?? 1),
      0,
    );
  }, [cartItems]);
  return (
    <Card className="container mx-auto py-5 mt-9 border-none">
      <div className="max-w-5xl max-lg:max-w-2xl mx-auto bg-white p-4">
        {/* <div className="border-b border-gray-300 pb-4">
          <h2 className="text-slate-900 text-2xl font-semibold">
            Shopping Cart
          </h2>
        </div> */}

        <div className="grid lg:grid-cols-3 gap-10 mt-12">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.length > 0 ? (
              cartItems?.map((elem: ICartItem, index: number) => {
                return (
                  <CartProduct
                    key={index}
                    cartItems={elem}
                    handleAddToCart={handleAddToCart}
                    handleDeleteToCart={handleDeleteToCart}
                    handleDeleteProduct={handleDeleteProduct}
                  />
                );
              })
            ) : (
              <Card className="border-none ">
                <div className="flex justify-center">
                  <Image
                    alt="Pizza-main"
                    src={"/empty-cart.png"}
                    width={300}
                    height={200}
                  />
                </div>
              </Card>
            )}
          </div>

          <div className="bg-gray-100 rounded-md p-4 h-max">
            <ul className="text-slate-500 font-medium space-y-4">
              <h3 className="text-slate-600 text-xl font-semibold">
                Shopping Cart
              </h3>
              <hr className="border-gray-300" />
              <li className="flex flex-wrap gap-4 text-sm text-slate-900">
                Total{" "}
                <span className="ml-auto font-semibold">₹{cartTotal}.00</span>
              </li>
            </ul>

            <div className="mt-8 space-y-3">
              <Link className="mb-3" href="/checkout">
                <button
                  type="button"
                  className="text-sm px-4 py-2.5 w-full font-medium tracking-wide bg-gray-800 hover:bg-gray-900 text-white rounded-md cursor-pointer"
                >
                  Checkout
                </button>
              </Link>
              <button
                type="button"
                className="text-sm mt-3  px-4 py-2.5 w-full font-medium tracking-wide bg-transparent text-slate-900 border border-gray-300 rounded-md cursor-pointer"
              >
                Continue Shopping{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
