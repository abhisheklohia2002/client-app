import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "@/components/card/ProductCard";
import { products } from "@/types/constants";
export default async function Home() {
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
          <Tabs defaultValue={response?.category[0]?.name}>
            <TabsList>
              {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
                    {products?.map((elem, index) => {
                      return <ProductCard key={index} product={elem} />;
                    })}
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </section>
    </>
  );
}
