import React from 'react';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { Link } from 'react-router-dom';

export default function BrandCard({ imageUrl }) {
  return (
    <div className='flex flex-col justify-center items-center m-3'>
      <img 
        src={imageUrl}
        alt="Brand Image"
        className='w-36 h-36 object-cover'
      />
      <Link to="/" className='flex items-center cursor-pointer transition-transform duration-200 hover:scale-105 hover:font-semibold'>
        Xem Thêm <IoIosArrowRoundForward />
      </Link>
    </div>
  );
}