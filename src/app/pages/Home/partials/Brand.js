import React from 'react';
import BrandCard from './BrandCard';

export default function Brand() {
  // Array of image URLs (or could be dynamic data from an API)
  const brandImages = [
    "https://maisonduparfumstore.com/cdn/shop/files/o.403.jpg?v=1724807681&width=150",
    "https://maisonduparfumstore.com/cdn/shop/files/o.50.jpg?v=1724807678&width=300",
    "https://maisonduparfumstore.com/cdn/shop/files/o.421.jpg?v=1724806482&width=300",
    "https://maisonduparfumstore.com/cdn/shop/files/o.770.jpg?v=1724807685&width=300",
    "https://maisonduparfumstore.com/cdn/shop/files/jExExUNB_400x400_38a21775-422e-4f9b-ae01-d17e041d193d.jpg?v=1724807705&width=300",
    "https://maisonduparfumstore.com/cdn/shop/files/o.139.jpg?v=1724807696&width=300",
    "https://maisonduparfumstore.com/cdn/shop/files/o.122.jpg?v=1724814667&width=300",
    "https://maisonduparfumstore.com/cdn/shop/files/o.2232.jpg?v=1724814692&width=300"
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-2 sm:px-8 lg:px-16 pb-4 lg:mx-28 md:mx-20 sm:mx-16">
      {brandImages.map((image, index) => (
        <div key={index}>
          <BrandCard imageUrl={image} />
        </div>
      ))}
    </div>
  );
}
