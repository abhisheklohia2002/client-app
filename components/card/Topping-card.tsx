"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import type { Topping } from "@/types/constants";
import { CircleCheck } from "lucide-react";

type Props = {
  topping: Topping;
  selectedToppings: Topping[];
  onToggle: (topping: Topping) => void;
};

export default function ToppingCard({
  topping,
  selectedToppings,
  onToggle,
}: Props) {
  const isSelected = selectedToppings.some((t) => t._id === topping._id);

  return (
    <Button
      type="button"
      onClick={() => onToggle(topping)}
      variant="outline"
      className={cn(
        "flex flex-col h-auto gap-2 py-4 cursor-pointer relative",
        isSelected && "border-primary ring-2 ring-primary/20",
      )}
    >
      <Image src={topping.image} width={80} height={80} alt={topping.name} />
      <h4 className="font-medium">{topping.name}</h4>
      <p className="text-sm text-foreground/70">$ {topping.price}</p>
      {isSelected && (
        <CircleCheck className="absolute top-2 right-3 text-primary" />
      )}
    </Button>
  );
}
