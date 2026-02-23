import { Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CartProduct({
  cartItems,
  handleDeleteToCart,
  handleAddToCart,
  handleDeleteProduct,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) {
  return (
    <div className="lg:col-span-2 space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 items-start sm:gap-4 gap-6">
        <div className="col-span-2 flex items-start gap-4">
          <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0 bg-gray-100 p-3 rounded-md">
            <Image
              alt="Pizza-main"
              src={"/pizza-main.png"}
              width={100}
              height={200}
            />
          </div>
          <div className="flex flex-col">
            <h3 className="text-base font-semibold text-slate-900">
              {cartItems?.product?.name}
            </h3>
            <p className="text-sm font-medium text-slate-500 mt-2">Chicken</p>
            <button
              onClick={() => handleDeleteProduct?.(cartItems.product?._id)}
              type="button"
              className="mt-6 font-semibold text-red-500 text-xs flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <Trash size={17} />
              REMOVE
            </button>
          </div>
        </div>

        <div className="sm:ml-auto max-sm:flex max-sm:justify-between max-sm:gap-4 max-sm:col-span-full">
          <h4 className="text-base font-semibold text-slate-900">
            ₹{cartItems?.totalPrice}
          </h4>
          <div className="flex items-center px-2.5 py-1.5 border border-gray-300 text-slate-900 text-xs font-medium rounded-md sm:mt-6">
            <span className="cursor-pointer">
              <Plus
                onClick={() => handleAddToCart?.(cartItems.product?._id)}
                size={15}
              />
            </span>
            <span className="mx-3">{cartItems?.qty}</span>
            <span className="cursor-pointer">
              <Minus
                onClick={() => handleDeleteToCart?.(cartItems.product?._id)}
                size={15}
              />
            </span>
          </div>
        </div>
      </div>
      <hr className="border-gray-300" />
    </div>
  );
}
