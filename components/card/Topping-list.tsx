"use client";

import React, { useState } from "react";
import { Topping, toppings } from "@/types/constants";
import ToppingCard from "./Topping-card";

export default function ToppingList() {
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([
    toppings[0],
  ]);

  const handleToppingToggle = (topping: Topping) => {
    const isSelected = selectedToppings.some((t) => t.id === topping.id);

    if (isSelected) {
      setSelectedToppings((prev) => prev.filter((t) => t.id !== topping.id));
      return;
    }

    setSelectedToppings((prev) => [...prev, topping]);
  };

  return (
    <section className="mt-2">
      <h3 className="text-sm font-medium cursor-pointer select-none">
        Extra Topping
      </h3>

      <div className="grid grid-cols-3 gap-4 mt-4">
        {toppings.map((topping) => (
          <ToppingCard
            key={topping.id}
            topping={topping}
            selectedToppings={selectedToppings}
            onToggle={handleToppingToggle}
          />
        ))}
      </div>
    </section>
  );
}