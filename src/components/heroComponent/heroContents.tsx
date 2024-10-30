import React from 'react'
import Image from "next/image";

const HeroContents = () => {
  return (
    <div className="relative h-96 w-full">
   
      <Image
        src="/executive-room2.jpg" 
        alt="Hotel View"
        layout="fill"
        objectFit="cover"
        priority 
        className="z-0"
      />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          HOTEL RANKING
        </h1>
        <p className="text-lg md:text-2xl text-white mb-6">
          Rate Hotels and View Hotels According to Rating
        </p>
        <button className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition duration-300">
          Rate Now
        </button>
      </div>
    </div>
  )
}

export default HeroContents;