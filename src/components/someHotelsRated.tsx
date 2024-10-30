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
    imageSrc: ''
}
const defaultCardData:Hotel[] = [defaultData, defaultData, defaultData, defaultData];

const SomeHotelsRated = () => {
    const [hotels, setHotels] = useState<Hotel[]>([])

  // const displayData:Hotel[] = hotels.length > 0 ? hotels : defaultCardData;
    useEffect(() => {
        const retrieveHotel = async () => {
            const retrievedArrayString = localStorage.getItem("hotels")
            if (retrievedArrayString) {
                const hotelFound = JSON.parse(retrievedArrayString)
                // setHotels(hotelFound)
                if (hotelFound.length > 0) {
                    const lastThreeHotels = hotelFound.slice(-4);
                    setHotels(lastThreeHotels);
                }
            };
        }
        retrieveHotel();
    }, []);
  return (
    <div className='border-2 mx-8'>
        <div className='flex flex-col items-center'>
        <h3 className='text-2xl font-bold'>View Some Rated Hotels</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 mt-8 mb-12">

                {hotels && hotels.length > 0? hotels.map((hotel) => (
                    <Card
                        key={hotel.name}
                        width="w-full"
                        height="h-64"

                    >
                            <h2 className="text-xl font-bold">{hotel.name}</h2>
                            <button
                                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                            >
                                Explore Hotel
                            </button>
                    </Card>
                )):
                    defaultCardData.map((value, index)=>(
                        <Card key={index}>
                            <p className="my-4">{value.description}</p>
                        </Card>
                    ))
                }

        </div>
        </div>

    </div>
  
  )
}

export default SomeHotelsRated