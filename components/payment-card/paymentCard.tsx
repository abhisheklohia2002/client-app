import { Coins, Landmark } from "lucide-react";
import React from "react";
import { Card } from "../ui/card";
const paymentModes = [
  { id: "bank", label: "Bank Transfer", icon: Landmark },
  { id: "cash", label: "Cash", icon: Coins },
];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PaymentCard({ formData, handlePaymentMode }: any) {
  return (
    <div>
      <label className="mb-2 block font-semibold">Payment Mode</label>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {paymentModes.map((mode) => {
          const Icon = mode.icon;
          const isSelected = formData.paymentMode === mode.id;

          return (
            <Card
              key={mode.id}
              onClick={() => handlePaymentMode(mode.id)}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-4 transition ${
                isSelected ? "border-gray-900 bg-gray-50" : "border-gray-200"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-sm font-medium text-slate-900">
                {mode.label}
              </span>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
