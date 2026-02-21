import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger,DialogTitle } from "@/components/ui/dialog";
import { RadioGroup } from "@/components/ui/radio-group";
import RadioCard from "./RadioCard";
import ToppingList from "./Topping-list";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
type Product = {
  id: string;
  name: string;
  desciption: string;
  image: string;
  price: number;
};

type PropType = {
  product: Product;
};

export default function ProductCard({ product }: PropType) {
  return (
    <Card className="border-none rounded-xl">
      <CardHeader className="flex items-center justify-center">
        <Image
          alt={product.name}
          src={"/pizza-main.png"}
          width={180}
          height={180}
        />
      </CardHeader>

      <CardContent>
        <h2 className="text-xl font-bold">{product.name}</h2>
        <p className="mt-2 text-foreground/70">{product.desciption}</p>
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <p className="flex items-center gap-2">
          <span className="text-foreground/70">From</span>
          <span className="font-bold">${product.price}</span>
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
                <p className="mt-1 text-foreground/70">{product.desciption}</p>

                <div className="mt-6">
                  <h4 className="text-sm font-medium text-foreground/80">
                    Choose the size
                  </h4>

                  <RadioGroup
                    defaultValue="medium"
                    className="grid grid-cols-3 gap-4 mt-3"
                  >
                    <RadioCard value="small" label="Small" />
                    <RadioCard value="medium" label="Medium" />
                    <RadioCard value="large" label="Large" />
                  </RadioGroup>
                </div>
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-foreground/80">
                    Choose the crust
                  </h4>

                  <RadioGroup
                    defaultValue="thin"
                    className="grid grid-cols-2 gap-4 mt-3"
                  >
                    <RadioCard value="thin" label="Thin" />
                    <RadioCard value="thick" label="Thick" />
                  </RadioGroup>
                </div>

                <ToppingList />
                <div className="flex items-center justify-between mt-3">
                    <span className=" text-sm font-medium cursor-pointer select-none">
                        $400
                    </span>
                    <Button className=" text-sm font-medium cursor-pointer select-none">
                        <ShoppingCart/>
                        <span>
                            Add to cart
                        </span>
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
