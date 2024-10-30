import React from 'react';
import Image from 'next/image';
import StarRating from './starRating';

export interface Hotel {
  name: string;
  country: string;
  address: string;
  category: string;
  description: string;
  image: string; // Add image field
}

interface HotelCardProps {
  hotel: Hotel;
  onDelete: (name: string) => void;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel, onDelete }) => {
  const handleDelete = () => {
    onDelete(hotel.name);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      
      <div className="relative h-48 w-full mb-4">
        <Image
          src={hotel.image}
          alt={hotel.name}
          fill
          style={{ objectFit: 'cover' }}
          className="rounded-lg"
        />
      </div>
      <h2 className="font-bold text-xl mb-2">{hotel.name}</h2>
      <p className="text-gray-700">{hotel.description}</p>
      <p className="text-gray-500">Category: {hotel.category}</p>
      <p className="text-gray-500">Address: {hotel.address}, {hotel.country}</p>
      <span>Rate: 
      <StarRating/>
      
      </span>
      <div className='flex justify-between'>
      <button className="bg-blue-500 text-white py-2 px-4 mt-2 rounded hover:bg-blue-600">
        Rate Hotel
      </button>
      <button 
        onClick={handleDelete}
        className="bg-red-500 text-white py-2 px-4 mt-2 rounded hover:bg-blue-600"
      >
        Delete Hotel
      </button>
    </div>
    </div>
  );
};

export default HotelCard;
