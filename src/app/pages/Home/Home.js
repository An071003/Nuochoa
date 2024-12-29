import React from "react";
import { sCount } from "./homeStore";
import Carousel from "./partials/Carousel";
import ProductList from "./partials/ProductList";
import Brand from "./partials/Brand";
import Video from "./partials/Video";

export default function Home() {


  return (
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
