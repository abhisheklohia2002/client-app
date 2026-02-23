"use client";
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import CartProduct from "./CartProduct";
import { useAppSelector } from "@/lib/store/hooks/hooks";
import { ICartItem } from "@/lib/store/features/cart/cartSlice";

export default function Cart() {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const [cartStore, setCartStore] = useState<ICartItem[]>([]);
  const existing: ICartItem[] = JSON.parse(
    localStorage.getItem("addToCart") || "[]",
  );
  console.log(existing);
  return (
    <Card className="container mx-auto py-5 mt-9 border-none">
      <div className="max-w-5xl max-lg:max-w-2xl mx-auto bg-white p-4">
        <div className="border-b border-gray-300 pb-4">
          <h2 className="text-slate-900 text-2xl font-semibold">
            Shopping Cart
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-10 mt-12">
          {cartItems?.map((elem: ICartItem, index: number) => {
            return <CartProduct key={index} cartItems={elem} />;
          })}

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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#bbb"
                      stroke="#bbb"
                      className="w-4 h-4 absolute right-4"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="10"
                        cy="7"
                        r="6"
                        data-original="#000000"
                      ></circle>
                      <path
                        d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                        data-original="#000000"
                      ></path>
                    </svg>
                  </div>

                  <div className="relative flex items-center">
                    <input
                      type="email"
                      placeholder="Email"
                      className="px-4 py-2.5 bg-white text-slate-900 rounded-md w-full text-sm border-b border-gray-200 pr-10 focus:border-gray-800 outline-none"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#bbb"
                      stroke="#bbb"
                      className="w-4 h-4 absolute right-4"
                      viewBox="0 0 682.667 682.667"
                    >
                      <defs>
                        <clipPath id="a" clipPathUnits="userSpaceOnUse">
                          <path
                            d="M0 512h512V0H0Z"
                            data-original="#000000"
                          ></path>
                        </clipPath>
                      </defs>
                      <g
                        clip-path="url(#a)"
                        transform="matrix(1.33 0 0 -1.33 0 682.667)"
                      >
                        <path
                          fill="none"
                          stroke-miterlimit="10"
                          stroke-width="40"
                          d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                          data-original="#000000"
                        ></path>
                        <path
                          d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                          data-original="#000000"
                        ></path>
                      </g>
                    </svg>
                  </div>

                  <div className="relative flex items-center">
                    <input
                      type="number"
                      placeholder="Phone No."
                      className="px-4 py-2.5 bg-white text-slate-900 rounded-md w-full text-sm border-b border-gray-200 pr-10 focus:border-gray-800 outline-none"
                    />
                    <svg
                      fill="#bbb"
                      className="w-4 h-4 absolute right-4"
                      viewBox="0 0 64 64"
                    >
                      <path
                        d="m52.148 42.678-6.479-4.527a5 5 0 0 0-6.963 1.238l-1.504 2.156c-2.52-1.69-5.333-4.05-8.014-6.732-2.68-2.68-5.04-5.493-6.73-8.013l2.154-1.504a4.96 4.96 0 0 0 2.064-3.225 4.98 4.98 0 0 0-.826-3.739l-4.525-6.478C20.378 10.5 18.85 9.69 17.24 9.69a4.69 4.69 0 0 0-1.628.291 8.97 8.97 0 0 0-1.685.828l-.895.63a6.782 6.782 0 0 0-.63.563c-1.092 1.09-1.866 2.472-2.303 4.104-1.865 6.99 2.754 17.561 11.495 26.301 7.34 7.34 16.157 11.9 23.011 11.9 1.175 0 2.281-.136 3.29-.406 1.633-.436 3.014-1.21 4.105-2.302.199-.199.388-.407.591-.67l.63-.899a9.007 9.007 0 0 0 .798-1.64c.763-2.06-.007-4.41-1.871-5.713z"
                        data-original="#000000"
                      ></path>
                    </svg>
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
