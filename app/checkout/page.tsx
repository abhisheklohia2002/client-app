import { Card } from "@/components/ui/card";
import {
  BadgePercent,
  CirclePlus,
  Coins,
  House,
  Landmark,
  Mail,
  User,
} from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  return (
    <Card className="container mx-auto py-5 mt-9 border-none">
      <div className="max-w-5xl max-lg:max-w-2xl mx-auto bg-white p-4">
        <div className="border-b border-gray-300 pb-4">
          <h2 className="text-slate-900 text-2xl font-semibold">
            Customer details
          </h2>
        </div>
        <div className="grid lg:grid-cols-3 gap-10 mt-12">
          <div className="lg:col-span-2 space-y-4">
            <div>
              <label htmlFor="" className="mb-2 font-semibold">
                Full Name
              </label>
              <div className="flex items-center justify-around gap-2">
                <div className="relative flex items-center w-full">
                  <input
                    type="text"
                    placeholder="Abhishek"
                    className=" mt-1 px-4 py-2.5 bg-[#fcf9f8] text-slate-900 rounded-md w-full text-sm border-b border-gray-200 pr-10 focus:border-gray-800 outline-none"
                  />
                </div>
                <div className="relative flex items-center w-full">
                  <input
                    type="text"
                    placeholder="Sharma"
                    className=" mt-1 px-4 py-2.5 bg-[#fcf9f8] text-slate-900 rounded-md w-full text-sm border-b border-gray-200 pr-10 focus:border-gray-800 outline-none"
                  />
                  <User className="w-4 h-4 absolute right-3" />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="" className="mb-2 font-semibold">
                Email
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="abx2@gmail.com"
                  className=" mt-1 px-4 py-2.5 bg-[#fcf9f8] text-slate-900 rounded-md w-full text-sm border-b border-gray-200 pr-10 focus:border-gray-800 outline-none"
                />
                <Mail className="w-4 h-4 absolute right-3" />
              </div>
            </div>

            <div>
              <label htmlFor="" className="font-semibold">
                Address
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="abx2@gmail.com"
                  className=" mt-1 px-4 py-2.5 bg-[#fcf9f8] text-slate-900 rounded-md w-full text-sm border-b border-gray-200 pr-10 focus:border-gray-800 outline-none"
                />
                <House className="w-4 h-4 absolute right-3" />
              </div>
              {/* <Card className="container mx-auto py-5 px-3 mt-3 w-100 border-none flex items-center">
                  <CirclePlus />
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Possimus cupiditate itaque 
                </Card> */}
            </div>

            <div>
              <label htmlFor="" className="mb-2 font-semibold">
                Payment Mode
              </label>
              <div className="relative flex items-center gap-3">
                {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any, react/jsx-key
                  [<Landmark />, <Coins />].map((elem: any, index: number) => (
                    <Card
                      key={index}
                      className="container mx-auto py-5 px-3 mt-3 w-100 border-none flex items-center"
                    >
                      {elem}
                    </Card>
                  ))
                }
              </div>
              <div className="mt-3">
                <label className="mb-2 font-semibold block">Comments</label>
                <div className="relative flex items-center">
                  <textarea
                    placeholder=""
                    className="mt-1 px-4 py-3 bg-[#fcf9f8] text-slate-900 rounded-md w-full text-sm border-b border-gray-200 focus:border-gray-800 outline-none min-h-[120px] resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 rounded-md p-4 h-max">
            <div>
              <h3 className="font-bold">Order Summary</h3>
            </div>
            <ul className="text-slate-500 font-medium mt-6 space-y-4">
              <li className="flex flex-wrap gap-4 text-sm">
                Subtotal
                <span className="ml-auto font-semibold text-slate-900">
                  ₹200.00
                </span>
              </li>
              <li className="flex flex-wrap gap-4 text-sm">
                Shipping{" "}
                <span className="ml-auto font-semibold text-slate-900">
                  ₹2.00
                </span>
              </li>
              <li className="flex flex-wrap gap-4 text-sm">
                Tax{" "}
                <span className="ml-auto font-semibold text-slate-900">
                  ₹4.00
                </span>
              </li>
              <li className="flex flex-wrap gap-4 text-sm">
                Discount{" "}
                <span className="ml-auto font-semibold text-slate-900">
                  ₹0.00
                </span>
              </li>
              <hr className="border-gray-300" />
              <li className="flex flex-wrap gap-4 text-sm text-slate-900">
                Total <span className="ml-auto font-semibold">₹{}.00</span>
              </li>
              <div className="flex items-center">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    placeholder="Discount"
                    className="px-4 py-2.5 bg-white text-slate-900 rounded-md w-full text-sm border-b border-gray-200 pr-10 focus:border-gray-800 outline-none"
                  />
                  <BadgePercent className="w-4 h-4 absolute right-3" />
                </div>
                <div className="ml-1">
                  <button
                    type="button"
                    className="text-sm text-white bg-black  p-2 text-slate-900 border border-gray-300 rounded-md cursor-pointer tracking-wide
                  font-medium
                  "
                  >
                    Apply
                  </button>
                </div>
              </div>
            </ul>

            <div className="mt-8 space-y-3">
              <Link href="/place-order">
                <button
                  type="button"
                  className="text-sm px-4 py-2.5 w-full font-medium tracking-wide bg-gray-800 hover:bg-gray-900 text-white rounded-md cursor-pointer"
                >
                  place order
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
