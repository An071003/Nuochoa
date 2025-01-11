import React from "react";
import { sCount } from "./homeStore";
import Carousel from "./partials/Carousel";
import ProductList from "./partials/ProductList";
import Brand from "./partials/Brand";
import Video from "./partials/Video";

export default function Home() {
  return (
    <div className="bg-white">
      <div className="w-full min-h-[400px] pb-24">
        <Carousel />
      </div>
      
      <div className="py-12 sm:py-16 md:py-20">
        <Brand />
      </div>

      <div className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <Video />
      </div>

      <div className="py-12 sm:py-16 md:py-20">
        <ProductList />
      </div>
    </div>
  );
}
