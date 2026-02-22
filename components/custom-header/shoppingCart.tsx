"use client";
import {  useAppSelector } from "@/lib/store/hooks/hooks";
import { ShoppingBasket } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function ShoppingCart() {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  return (
    <div className="relative">
      <Link href={"/cart"}>
        <ShoppingBasket className="hover:text-primary cursor-pointer" />
      </Link>
      <span className="absolute -top-4 right-[-10px] h-6 w-6 flex items-center justify-center rounded-full bg-primary font-bold text-white">
        {cartItems.length}
      </span>
    </div>
  );
}
