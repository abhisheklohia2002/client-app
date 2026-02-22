import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
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
import { IProduct } from "@/types/constants";

type PropType = {
  product: IProduct;
};

export default function ProductCard({ product }: PropType) {
  return (
    <Card className="border-none rounded-xl">
      <CardHeader className="flex items-center justify-center">
        <Image
          alt={product?.name}
          src={product?.image}
          width={180}
          height={180}
        />
      </CardHeader>

      <CardContent>
        <h2 className="text-xl font-bold">{product.name}</h2>
        <p className="mt-2 text-foreground/70">{product.description}</p>
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <p className="flex items-center gap-2">
          <span className="text-foreground/70">From</span>
          <span className="font-bold">${90}</span>
        </p>

        <Dialog>
          <DialogTrigger className="bg-primary text-primary-foreground hover:opacity-90 px-6 py-2 rounded-full shadow transition-all duration-150">
            Choose
          </DialogTrigger>

          <DialogContent className="max-w-dvw p-0">
            <VisuallyHidden>
              <DialogTitle>{product.name}</DialogTitle>
            </VisuallyHidden>
            <div className="flex">
              {/* Left Image */}
              <div className="w-1/2 bg-white rounded-xl flex items-center justify-center p-6">
                <Image
                  alt={product.name}
                  src={"/pizza-main.png"}
                  width={280}
                  height={240}
                />
              </div>

              <div className="w-3/3 p-8">
                <h3 className="text-xl font-bold">{product.name}</h3>
                <p className="mt-1 text-foreground/70">{product.description}</p>

                <div className="mt-6">
                  {Object.entries(product.priceConfiguration).map(
                    ([key, value]) => {
                      const options = Object.keys(value.availableOptions);

                      return (
                        <div key={key} className="mt-6">
                          <h4 className="text-sm font-medium text-foreground/80">
                            Choose the {key}
                          </h4>

                          <RadioGroup
                            defaultValue={options[0]}
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

                <ToppingList />
                <div className="flex items-center justify-between mt-3">
                  <span className=" text-sm font-medium cursor-pointer select-none">
                    ₹400
                  </span>
                  <Button className=" text-sm font-medium cursor-pointer select-none">
                    <ShoppingCart />
                    <span>Add to cart</span>
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
