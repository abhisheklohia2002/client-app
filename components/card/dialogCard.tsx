"use client";
import React, { useMemo, useState } from "react";
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
import { toast } from "sonner"
type PropType = {
  product: IProduct;
};

type ChooseConfig = {
  [key: string]: string;
};

export default function DialogCard({ product }: PropType) {
  const [chooseConfig, setChooseConfig] = useState<ChooseConfig>();
  const [toppingsData, setToppingsData] = useState<Topping[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { priceConfiguration, ...productElem } = product as IProduct & {
    priceConfiguration?: unknown;
  };
  const handleToCart = (totalPrice:number) => {
    const payload: ICartItem = {
      product: productElem as IProduct,
      chooseConfiguration: {
        priceConfiguration: chooseConfig,
        topping: toppingsData,
      },
      qty: 1,
      totalPrice
    };
    dispatch(addToCart(payload));
    toast.success("Product has been Add.")
    setOpen(false);
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

  const totalPrice = useMemo(() => {
    const toppingPrice = [toppingsData as unknown as Topping].reduce(
      (acc, curr) => acc + Number(curr.price || 0),
      0,
    );

    const configPrice = Object.entries(chooseConfig ?? {}).reduce(
      (acc, [key, value]) => {
        const price =
          product.priceConfiguration?.[key]?.availableOptions?.[value] ?? 0;
        return acc + Number(price);
      },
      0,
    );

    return toppingPrice + configPrice;
  }, [toppingsData, chooseConfig, product.priceConfiguration]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        onClick={() => setOpen(true)}
        className="bg-primary text-primary-foreground hover:opacity-90 px-6 py-2 rounded-full shadow transition-all duration-150"
      >
        Choose
      </DialogTrigger>

      <DialogContent className="p-0 w-[900px] max-w-[95vw]">
        <VisuallyHidden>
          <DialogTitle>{product.name}</DialogTitle>
        </VisuallyHidden>
        <div className="flex flex-col md:flex-row">
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
                ₹{totalPrice}
              </span>
              <Button
                onClick={() => handleToCart(totalPrice)}
                className=" text-sm font-medium cursor-pointer select-none close"
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
