import React from 'react';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { Link } from 'react-router-dom';

export default function BrandCard({ imageUrl }) {
  return (
    <div className='flex flex-col justify-center items-center m-3'>
      <img 
        src={imageUrl}
        alt="Brand Image"
        className='w-36 h-36 object-cover rounded-md transition-transform duration-300 ease-in-out transform hover:scale-110'
      />
      <Link 
        to="/" 
        className='flex items-center cursor-pointer transition-all duration-200 hover:font-semibold mt-2'
      >
        Xem Thêm <IoIosArrowRoundForward />
      </Link>
    </div>
  );
}
