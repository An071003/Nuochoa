import React from "react";
import { sCount } from "./homeStore";
import Carousel from "./partials/Carousel";
import ProductList from "./partials/ProductList";
import Video from "./partials/Video";

export default function Home() {
  

  return (
    <div>
      <div className="w-full h-full min-h-96 pb-24 bg-blue-50 py-0">
        <Carousel/>
        <Video/>
        <ProductList/>
      </div>
    </div>
  );
}
