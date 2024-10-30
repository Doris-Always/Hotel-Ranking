"use client"
import React, { useEffect, useState } from 'react'
import {Hotel} from "@/app/hotels/page";
import Card from "@/components/cardComponents/card";

const defaultData =  {
    description: "No hotel has been added yet.",
    id: 0,
    name: '',
    country: '',
    address: '',
    rating: 0,
    imageSrc: '',
    category: "",
}
const defaultCardData:Hotel[] = [defaultData, defaultData, defaultData, defaultData];

const SomeHotelsRated = () => {
    const [hotels, setHotels] = useState<Hotel[]>([])


  useEffect(() => {
    const retrieveHotel = async () => {
        const retrievedArrayString = localStorage.getItem("hotels");
        if (retrievedArrayString) {
            const hotelFound = JSON.parse(retrievedArrayString);
            if (hotelFound.length > 0) {
                const lastHotels = hotelFound.slice(-4); // Get the last 4 hotels
                setHotels(lastHotels);
            }
        }
    };
    retrieveHotel();
}, []);

const displayData: Hotel[] = [...hotels, ...defaultCardData].slice(0, 4);
  return (
    <div className='border-2 mx-8'>
        <div className='flex flex-col items-center'>
        <h3 className='text-2xl font-bold'>View Some Rated Hotels</h3>

        <div className="flex flex-wrap justify-between gap-4 p-4 mt-8 mb-12">

        {displayData.map((hotel, index) => (
                        <Card key={index} width="w-64" height="h-64">
                            {hotel.name ? (
                                <>
                                    <h2 className="text-xl font-bold">{hotel.name}</h2>
                                    <button
                                        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                                    >
                                        Explore Hotel
                                    </button>
                                </>
                            ) : (
                                <p className="my-4">{hotel.description}</p>
                            )}
                        </Card>
                    ))
                }

        </div>
        </div>

    </div>
  
  )
}

export default SomeHotelsRated