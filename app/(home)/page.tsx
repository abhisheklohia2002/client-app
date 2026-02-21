import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "@/components/card/ProductCard";
import { products } from "@/types/constants";
export default function Home() {
  return (
    <>
      <section className="bg-white ">
        <div className="container mx-auto py-5 flex justify-between  ">
          <div>
            <h1 className="text-5xl font-black font-sans ">
              <span>Savor Delicious Pizza in</span>
              <br />
              <span className="text-primary mt-4">Only 45 Minutes</span>
            </h1>
            <p className="text-2xl mt-8 max-w-lg leading-snug">
              Lorem ipsum dolor sit amet consectetur
            </p>
            <Button className="mt-8 text-lg rounded-full  py-7 px-6 font-bold">
              Get Your Pizz Now
            </Button>
          </div>
          <div>
            <Image
              alt="Pizza-main"
              src={"/pizza-main.png"}
              width={300}
              height={200}
            />
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto py-8">
          <Tabs defaultValue="Pizza">
            <TabsList>
              <TabsTrigger className="cursor-pointer" value="Pizza">
                Pizza
              </TabsTrigger>
              <TabsTrigger className="cursor-pointer" value="Beverages">
                Beverages
              </TabsTrigger>
            </TabsList>
            <TabsContent value="Pizza">
             <div className="grid grid-cols-4 gap-4 mt-6">
               {products?.map((elem, index) => {
                return <ProductCard key={index} product={elem} />;
              })}
             </div>
            </TabsContent>
            <TabsContent value="Beverages">
                <div className="grid grid-cols-4 gap-4 mt-6">
               {products?.map((elem, index) => {
                return <ProductCard key={index} product={elem} />;
              })}
             </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}
