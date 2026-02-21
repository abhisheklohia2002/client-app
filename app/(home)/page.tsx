import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
          <Tabs defaultValue="Pizza" className="w-[400px]">
            <TabsList>
              <TabsTrigger className="cursor-pointer" value="Pizza">Pizza</TabsTrigger>
              <TabsTrigger className="cursor-pointer" value="Beverages">Beverages</TabsTrigger>
            </TabsList>
            <TabsContent value="Pizza">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
              recusandae quaerat impedit laboriosam hic, aperiam voluptatem
              tempora, laudantium obcaecati similique amet expedita, sapiente
              nihil libero.
            </TabsContent>
            <TabsContent value="Beverages">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde,
              tempore molestiae eius suscipit, dolorem, sunt rerum dicta fugit
              dolorum rem praesentium vel provident accusantium nihil.
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}
