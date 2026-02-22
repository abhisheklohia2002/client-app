"use client";

import React, { useEffect, useState } from "react";
import { Topping } from "@/types/constants";
import ToppingCard from "./Topping-card";
interface IPropsTopping {
  handleCheckBox: (data: Topping[]) => void;
}
export default function ToppingList({ handleCheckBox }: IPropsTopping) {
  const [toppingsData, setToppingsData] = useState<Topping[]>([]);
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);
  const handleToppingToggle = (topping: Topping) => {
    const isSelected = selectedToppings.some((t) => t._id === topping._id);

    if (isSelected) {
      setSelectedToppings((prev) => prev.filter((t) => t._id !== topping._id));
      return;
    }

    setSelectedToppings((prev) => [...prev, topping]);
    handleCheckBox?.(selectedToppings);
  };

  useEffect(() => {
    const fetchTopping = async () => {
      try {
        const toppingResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/catalog/topping`,
        );
        const response = await toppingResponse.json();

        setToppingsData(response?.finalTopping || []);
        setSelectedToppings(
          response?.finalTopping?.[0] ? [response.finalTopping[0]] : [],
        );
        handleCheckBox?.(response?.finalTopping?.[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTopping();
  }, []);
  return (
    <section className="mt-2">
      <h3 className="text-sm font-medium cursor-pointer select-none">
        Extra Topping
      </h3>

      <div className="grid grid-cols-3 gap-4 mt-4">
        {toppingsData.map((topping) => (
          <ToppingCard
            key={topping._id}
            topping={topping}
            selectedToppings={selectedToppings}
            onToggle={handleToppingToggle}
          />
        ))}
      </div>
    </section>
  );
}
