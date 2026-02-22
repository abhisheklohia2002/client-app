"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup } from "@/components/ui/radio-group";
import RadioCard from "./RadioCard";
import ToppingList from "./Topping-list";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { IProduct, PriceConfiguration, Topping } from "@/types/constants";
import { useAppDispatch } from "@/lib/store/hooks/hooks";
import { addToCart, ICartItem } from "@/lib/store/features/cart/cartSlice";
type PropType = {
  product: IProduct;
};

type ChooseConfig = {
  [key: string]: string;
};

export default function DialogCard({ product }: PropType) {
  const [chooseConfig, setChooseConfig] = useState<ChooseConfig>();
  const [toppingsData, setToppingsData] = useState<Topping[]>([]);
  const dispatch = useAppDispatch();
  const { priceConfiguration, ...productElem } = product as IProduct & {
    priceConfiguration?: unknown;
  };
  const handleToCart = () => {
    const payload: ICartItem = {
      product: productElem as IProduct,
      chooseConfiguration: {
        priceConfiguration: chooseConfig,
        topping: toppingsData,
      },
      qty: 1,
    };
    dispatch(addToCart(payload));
  };
  const handleRadioChange = (key: string, data: string) => {
    setChooseConfig((prev) => {
      return {
        ...prev,
        [key]: data,
      };
    });
  };
  const handleCheckBox = (data: Topping[]) => {
    setToppingsData(data);
  };
  return (
    <Dialog>
      <DialogTrigger className="bg-primary text-primary-foreground hover:opacity-90 px-6 py-2 rounded-full shadow transition-all duration-150">
        Choose
      </DialogTrigger>

      <DialogContent className="max-w-full p-0">
        <VisuallyHidden>
          <DialogTitle>{product.name}</DialogTitle>
        </VisuallyHidden>
        <div className="flex">
          {/* Left Image */}
          <div className="w-[40%] bg-white rounded-xl flex items-center justify-center p-6">
            <Image
              alt={product.name}
              src={product.image}
              width={280}
              height={240}
            />
          </div>

          <div className="w-[60%] p-8">
            <h3 className="text-xl font-bold">{product.name}</h3>
            <p className="mt-1 text-foreground/70">{product.description}</p>

            <div className="mt-6">
              {Object.entries(priceConfiguration as PriceConfiguration).map(
                ([key, value]) => {
                  const options = Object.keys(value.availableOptions);

                  return (
                    <div key={key} className="mt-6">
                      <h4 className="text-sm font-medium text-foreground/80">
                        Choose the {key}
                      </h4>

                      <RadioGroup
                        // defaultValue={options[0]}
                        onValueChange={(data) => {
                          handleRadioChange(key, data);
                        }}
                        className="grid grid-cols-3 gap-4 mt-3 max-h-48"
                      >
                        {options.map((option) => (
                          <RadioCard
                            key={option}
                            value={option}
                            label={`${option}`}
                          />
                        ))}
                      </RadioGroup>
                    </div>
                  );
                },
              )}
            </div>

            <ToppingList handleCheckBox={handleCheckBox} />
            <div className="flex items-center justify-between mt-3">
              <span className=" text-sm font-medium cursor-pointer select-none">
                ₹400
              </span>
              <Button
                onClick={() => handleToCart()}
                className=" text-sm font-medium cursor-pointer select-none"
              >
                <ShoppingCart />
                <span>Add to cart</span>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
