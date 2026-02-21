import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

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
        <Image alt={product.name} src={"/pizza-main.png"} width={180} height={180} />
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

          <DialogContent className="max-w-4xl p-0">
            <div className="flex">
              {/* Left Image */}
              <div className="w-1/3 bg-white rounded-xl flex items-center justify-center p-6">
                <Image alt={product.name} src={"/pizza-main.png"} width={280} height={240} />
              </div>

              {/* Right Content */}
              <div className="w-2/3 p-8">
                <h3 className="text-xl font-bold">{product.name}</h3>
                <p className="mt-1 text-foreground/70">{product.desciption}</p>

                {/* SIZE */}
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-foreground/80">
                    Choose the size
                  </h4>

                  <RadioGroup defaultValue="medium" className="grid grid-cols-3 gap-4 mt-3">
                    <RadioCard value="small" label="Small" />
                    <RadioCard value="medium" label="Medium" />
                    <RadioCard value="large" label="Large" />
                  </RadioGroup>
                </div>

                {/* CRUST */}
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-foreground/80">
                    Choose the crust
                  </h4>

                  <RadioGroup defaultValue="thin" className="grid grid-cols-2 gap-4 mt-3">
                    <RadioCard value="thin" label="Thin" />
                    <RadioCard value="thick" label="Thick" />
                  </RadioGroup>
                </div>

              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}

function RadioCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="w-full">
      <RadioGroupItem value={value} id={value} className="peer sr-only" />
      <Label
        htmlFor={value}
        className="
          flex items-center justify-center
          rounded-md border bg-white px-4 py-3
          text-sm font-medium cursor-pointer select-none
          transition
          hover:border-primary/60
          peer-data-[state=checked]:border-primary
          peer-data-[state=checked]:ring-2
          peer-data-[state=checked]:ring-primary/20
        "
      >
        {label}
      </Label>
    </div>
  );
}