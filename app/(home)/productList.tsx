import React from "react";
import ProductCard from "@/components/card/ProductCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IProduct } from "@/types/constants";


export default async function ProductList() {
  const categoryResponse = await fetch(
    `${process.env.BACKEND_URL}/api/catalog/category/`,
    {
      next: {
        revalidate: 3600,
      },
    },
  );
  if (!categoryResponse.ok) {
    throw new Error("failed to fetch category");
  }
  const response = await categoryResponse.json();

  const productResponse = await fetch(
    `${process.env.BACKEND_URL}/api/catalog/product/`,
  );
  if (!productResponse.ok) {
    throw new Error("failed to fetch product");
  }
  const productData = await productResponse.json();
  return (
    <div className="container mx-auto py-8">
      <Tabs defaultValue={response?.category[0]?.name ?? ''}>
        <TabsList>
          {// eslint-disable-next-line @typescript-eslint/no-explicit-any
          response?.category?.map((elem: any, index: number) => {
            return (
              <TabsTrigger
                key={index}
                className="cursor-pointer"
                value={elem.name}
              >
                {elem?.name}
              </TabsTrigger>
            );
          })}
        </TabsList>
        {// eslint-disable-next-line @typescript-eslint/no-explicit-any
        response?.category?.map((elem: any, index: number) => {
          return (
            <TabsContent key={index} value={elem.name}>
              <div className="grid grid-cols-4 gap-4 mt-6">
                {productData?.products?.map((elem: IProduct, index: number) => {
                  return <ProductCard key={index} product={elem} />;
                })}
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
