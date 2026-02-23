"use client";
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import CartProduct from "./CartProduct";
import { useAppSelector } from "@/lib/store/hooks/hooks";
import { ICartItem } from "@/lib/store/features/cart/cartSlice";
import { Mail, Phone, User } from "lucide-react";

function mergeCarts(localCart: ICartItem[], reduxCart: ICartItem[]) {
  const map = new Map<string, ICartItem>();
  for (const item of localCart) {
    map.set(item.product._id, { ...item });
  }
  for (const item of reduxCart) {
    const id = item.product._id;
    const existing = map.get(id);

    if (existing) {
      map.set(id, { ...existing, qty: (existing.qty ?? 1) + (item.qty ?? 1) });
    } else {
      map.set(id, { ...item });
    }
  }

  return Array.from(map.values());
}

export default function Cart() {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const [mergedCart, setMergedCart] = useState<ICartItem[]>([]);

  useEffect(() => {
    const mergeIsExisted = () => {
      const local: ICartItem[] = JSON.parse(
        localStorage.getItem("addToCart") || "[]",
      );
      const merged = mergeCarts(local, cartItems);
      setMergedCart(merged);
      console.log(mergedCart);
      localStorage.setItem("addToCart", JSON.stringify(merged));
    };
    mergeIsExisted();
  }, [cartItems]);

  return (
    <Card className="container mx-auto py-5 mt-9 border-none">
      <div className="max-w-5xl max-lg:max-w-2xl mx-auto bg-white p-4">
        <div className="border-b border-gray-300 pb-4">
          <h2 className="text-slate-900 text-2xl font-semibold">
            Shopping Cart
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-10 mt-12">
          <div className="lg:col-span-2 space-y-4">
            {mergedCart?.map((elem: ICartItem, index: number) => {
              return <CartProduct key={index} cartItems={elem} />;
            })}
          </div>

          <div className="bg-gray-100 rounded-md p-4 h-max">
            <form>
              <div>
                <h3 className="text-base text-slate-900 font-semibold mb-4">
                  Enter Details
                </h3>
                <div className="space-y-3">
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="px-4 py-2.5 bg-white text-slate-900 rounded-md w-full text-sm border-b border-gray-200 pr-10 focus:border-gray-800 outline-none"
                    />
                    <User
                    className="w-4 h-4 absolute right-4"
                    />
                  </div>

                  <div className="relative flex items-center">
                    <input
                      type="email"
                      placeholder="Email"
                      className="px-4 py-2.5 bg-white text-slate-900 rounded-md w-full text-sm border-b border-gray-200 pr-10 focus:border-gray-800 outline-none"
                    />
                    <Mail
                     className="w-4 h-4 absolute right-4"
                    />
                  </div>

                  <div className="relative flex items-center">
                    <input
                      type="number"
                      placeholder="Phone No."
                      className="px-4 py-2.5 bg-white text-slate-900 rounded-md w-full text-sm border-b border-gray-200 pr-10 focus:border-gray-800 outline-none"
                    />
                   <Phone
                   className="w-4 h-4 absolute right-4"
                   />
                  </div>
                </div>
              </div>
            </form>

            <ul className="text-slate-500 font-medium mt-6 space-y-4">
              <li className="flex flex-wrap gap-4 text-sm">
                Subtotal{" "}
                <span className="ml-auto font-semibold text-slate-900">
                  $200.00
                </span>
              </li>
              <li className="flex flex-wrap gap-4 text-sm">
                Shipping{" "}
                <span className="ml-auto font-semibold text-slate-900">
                  $2.00
                </span>
              </li>
              <li className="flex flex-wrap gap-4 text-sm">
                Tax{" "}
                <span className="ml-auto font-semibold text-slate-900">
                  $4.00
                </span>
              </li>
              <hr className="border-gray-300" />
              <li className="flex flex-wrap gap-4 text-sm text-slate-900">
                Total <span className="ml-auto font-semibold">$206.00</span>
              </li>
            </ul>

            <div className="mt-8 space-y-3">
              <button
                type="button"
                className="text-sm px-4 py-2.5 w-full font-medium tracking-wide bg-gray-800 hover:bg-gray-900 text-white rounded-md cursor-pointer"
              >
                Checkout
              </button>
              <button
                type="button"
                className="text-sm px-4 py-2.5 w-full font-medium tracking-wide bg-transparent text-slate-900 border border-gray-300 rounded-md cursor-pointer"
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
