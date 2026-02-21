import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="bg-white ">
        <div className="container mx-auto flex justify-between  ">
          <div>
            <h1 className="text-5xl font-black font-sans ">
              <span>
                Savor Delicious Pizza in</span> 
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
            src={'/pizza-main.png'}
            width={400}
            height={400}
            />
          </div>
        </div>
      </section>
    </>
  );
}
