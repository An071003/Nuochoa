import React from "react";
import { sCount } from "./homeStore";

export default function Home() {
  const count = sCount.use();

  const handleClick = () => {
    sCount.set((n) => (n.value += 1));
  };

  return (
    <div>
      <h1 className="font-sans text-3xl min-h-[600px]">Home {count}</h1>
      
    </div>
  );
}
