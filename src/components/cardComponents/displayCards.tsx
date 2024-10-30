"use client"
import React from 'react'
import Card from './card';
import { useRouter } from 'next/navigation';

const cardData = [
  {
    title: "Add New Hotel",
    description: "You can create a new hotel",
    link: "/createHotel"

  },
  {
    title: "View All Hotels",
    description: "View all the hotel and rate accordingly",
    link: "/hotels"
  },
  {
    title: "Add New Category",
    description: "Create custom categories for hotels",
      link: "/categories"
  },
  {
    title: "Rate hotels",
    description: "Your rating matters to us",
      link: "/rate"
  },
];

const DisplayCards = () => {
  const router = useRouter();
  return (
    <div className="flex flex-wrap justify-center gap-4 p-4 mt-8 mb-12">
      {cardData.map((card, index) => (
        <Card
          key={index}
          width="w-80" 
          height="h-48" 
          backgroundColor="bg-white"
          //  icon={<AiOutlineHeart className="text-4xl text-red-500" />} 
          // imageSrc={card.imageSrc} // Pass image source from data
        >
          <h2 className="text-xl font-semibold text-gray-600">{card.title}</h2>
          <p className='my-4 '>{card.description}</p>
          <button 
            onClick={() => router.push(card.link)} 
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          >
           {card.title}  
          </button>
        </Card>
      ))}
    </div>
  )
}

export default DisplayCards;