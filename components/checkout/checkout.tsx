"use client";
import React, { useMemo } from "react";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { BadgePercent, Coins, House, Landmark, Mail, User } from "lucide-react";
import Link from "next/link";
import PaymentCard from "../payment-card/paymentCard";
import { useAppSelector } from "@/lib/store/hooks/hooks";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  paymentMode: string;
  comments: string;
  discountCode: string;
};
interface IDiscount {
  couponName: string;
  couponPrice: number;
  success:string;
  fail:string
}
export function CheckoutPage() {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const [discount, setDiscount] = useState<IDiscount>({
    couponName: "",
    couponPrice: 0,
    success: "",
    fail: ""
  });
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    paymentMode: "",
    comments: "",
    discountCode: "",
    
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentMode = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      paymentMode: value,
    }));
  };

  const handleSubmit = () => {
    console.log("All Form Data:", formData);
  };

  const cartTotal = useMemo(() => {
    return cartItems.reduce(
      (acc, item) => acc + Number(item.totalPrice ?? 0) * (item.qty ?? 1),
      0,
    );
  }, [cartItems]);
  const handleTotal = () => {
    if (cartTotal !== 0) {
      return cartTotal - discount.couponPrice;
    }
    return 0;
  };

  const handleDiscount = async (value: string) => {
    const res = await fetch("/api/coupon", {
      method: "POST",
      cache: "no-store",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: value, tenantId: 1 }),
    });

    const data = await res.json();
    if (!data?.isValid) {
      setDiscount((prev) => ({
        ...prev,
        couponName: value,
        couponPrice: 0,
        fail: "Invalid coupon code.",
        success:''
      }));
      return;
    }
    setDiscount((prev) => ({
      ...prev,
      couponName: value,
      couponPrice: data.discount,
      success: "Coupon applied successfully.",
      fail:''
    }));
  };

  return (
    <Card className="container mx-auto mt-9 border-none py-5">
      <div className="mx-auto max-w-5xl bg-white p-4 max-lg:max-w-2xl">
        <div className="border-b border-gray-300 pb-4">
          <h2 className="text-2xl font-semibold text-slate-900">
            Customer details
          </h2>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-3">
          <div className="space-y-5 lg:col-span-2">
            <div>
              <label className="mb-2 block font-semibold">Full Name</label>
              <div className="flex items-center gap-2">
                <div className="relative w-full">
                  <input
                    name="firstName"
                    type="text"
                    placeholder="Abhishek"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border-b border-gray-200 bg-[#fcf9f8] px-4 py-2.5 pr-10 text-sm text-slate-900 outline-none focus:border-gray-800"
                  />
                  <User className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                </div>

                <div className="relative w-full">
                  <input
                    name="lastName"
                    type="text"
                    placeholder="Sharma"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border-b border-gray-200 bg-[#fcf9f8] px-4 py-2.5 pr-10 text-sm text-slate-900 outline-none focus:border-gray-800"
                  />
                  <User className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                </div>
              </div>
            </div>

            <div>
              <label className="mb-2 block font-semibold">Email</label>
              <div className="relative">
                <input
                  name="email"
                  type="email"
                  placeholder="abx2@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border-b border-gray-200 bg-[#fcf9f8] px-4 py-2.5 pr-10 text-sm text-slate-900 outline-none focus:border-gray-800"
                />
                <Mail className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="mb-2 block font-semibold">Address</label>
              <div className="relative">
                <input
                  name="address"
                  type="text"
                  placeholder="Enter your address"
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border-b border-gray-200 bg-[#fcf9f8] px-4 py-2.5 pr-10 text-sm text-slate-900 outline-none focus:border-gray-800"
                />
                <House className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2" />
              </div>
            </div>

            <PaymentCard
              handlePaymentMode={handlePaymentMode}
              formData={formData}
            />
            <div>
              <label className="mb-2 block font-semibold">Comments</label>
              <textarea
                name="comments"
                placeholder="Write your comments here..."
                value={formData.comments}
                onChange={handleChange}
                className="mt-1 min-h-[120px] w-full resize-none rounded-md border-b border-gray-200 bg-[#fcf9f8] px-4 py-3 text-sm text-slate-900 outline-none focus:border-gray-800"
              />
            </div>
          </div>

          <div className="h-max rounded-md bg-gray-100 p-4">
            <h3 className="font-bold text-slate-900">Order Summary</h3>

            <ul className="mt-6 space-y-4 font-medium text-slate-500">
              <li className="flex flex-wrap gap-4 text-sm">
                Subtotal
                <span className="ml-auto font-semibold text-slate-900">
                  ₹{cartTotal}
                  .00
                </span>
              </li>

              <li className="flex flex-wrap gap-4 text-sm">
                Shipping
                <span className="ml-auto font-semibold text-slate-900">
                  ₹{0}
                </span>
              </li>

              <li className="flex flex-wrap gap-4 text-sm">
                Tax
                <span className="ml-auto font-semibold text-slate-900">
                  ₹{0}
                </span>
              </li>

              <li className="flex flex-wrap gap-4 text-sm">
                Discount {discount.couponName}
                <span className="ml-auto font-semibold text-[#109B9C] ">
                  {discount.couponPrice <= 0 ? null : "-"} ₹
                  {discount.couponPrice === 0 ? 0 : discount.couponPrice + " %"}
                </span>
              </li>
                {/* <div className="text-sm lh-0">
                  {discount.couponPrice === 0 ? discount.fail:discount.success}
                </div> */}
              <hr className="border-gray-300" />

              <li className="flex flex-wrap gap-4 text-sm text-slate-900">
                Total
                <span className="ml-auto font-semibold">₹{handleTotal()}</span>
              </li>

              <div className="flex items-center gap-2">
                <div className="relative w-full">
                  <input
                    name="discountCode"
                    type="text"
                    placeholder="Discount code"
                    value={formData.discountCode}
                    onChange={handleChange}
                    className="w-full rounded-md border-b border-gray-200 bg-white px-4 py-2.5 pr-10 text-sm text-slate-900 outline-none focus:border-gray-800"
                  />
                  <BadgePercent className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                </div>

                <button
                  type="button"
                  className="rounded-md border border-gray-300 bg-black p-2 text-sm font-medium tracking-wide text-white"
                  onClick={() => handleDiscount(formData.discountCode)}
                >
                  Apply
                </button>
              </div>
            </ul>

            <div className="mt-8 space-y-3">
              <button
                type="button"
                onClick={handleSubmit}
                className="block w-full rounded-md bg-gray-800 px-4 py-2.5 text-center text-sm font-medium tracking-wide text-white hover:bg-gray-900"
              >
                Place order
              </button>

              <Link href="/place-order" className="block text-center text-sm">
                Go to order page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
