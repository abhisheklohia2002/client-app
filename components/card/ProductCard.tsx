
import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { IProduct } from "@/types/constants";
import DialogCard from "./dialogCard";

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

        <DialogCard product={product}/>
      </CardFooter>
    </Card>
  );
}
