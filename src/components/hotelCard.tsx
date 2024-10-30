// HotelCard.tsx
import React from 'react';
import Card from '@/components/cardComponents/card';

export interface Hotel {
  id: number;
  name: string;
  country: string;
  address: string;
  description: string;
  rating: number;
  imageSrc: string;
  category: string;
}

interface HotelCardProps {
  hotel: Hotel;
  onDelete: (name: string) => void;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel, onDelete }) => (
  <Card key={hotel.name} width="w-full" height="h-64">
    <h3 className="text-lg font-bold">{hotel.name}</h3>
    <p className="text-gray-700">{hotel.country}, {hotel.address}</p>
    <p className="text-gray-500">{hotel.description}</p>
    <p className="text-yellow-500">Rating: {hotel.rating} ⭐</p>
    <div>
      <button className="bg-blue-500 text-white py-2 px-4 mt-2 rounded hover:bg-blue-600">
        Rate Hotel
      </button>
      <button 
        onClick={() => onDelete(hotel.name)}
        className="bg-blue-500 text-white py-2 px-4 mt-2 rounded hover:bg-blue-600"
      >
        Delete Hotel
      </button>
    </div>
  </Card>
);

export default HotelCard;
