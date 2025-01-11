import React from "react";
import { sCount } from "./homeStore";
import Carousel from "./partials/Carousel";
import ProductList from "./partials/ProductList";
import Brand from "./partials/Brand";
import Video from "./partials/Video";

export default function Home() {


  return (import React from "react";
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

    <div>
      <div className="w-full h-full min-h-96 pb-24 bg-white py-0">
        <Carousel />
        <Brand />
        <Video/>
        <ProductList/>
      </div>
    </div>
  );
}
