"use client"
import Card from '@/components/cardComponents/card';
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import axios from "axios";
import {useRouter} from "next/navigation";

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
const Hotels= () => {
  const router = useRouter();
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [categories, setCategories] = useState<string[]>(['1 Star', '2 Star', '3 Star']);
  const [isFilter , setFilter] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [ selectedCategory, setSelectedCategory] = useState<string>();

  const fetchCategories =  () => {
    const categoriesString= localStorage.getItem("categories")
    if (categoriesString) {
      const currentCategories = JSON.parse(categoriesString)
      setCategories(currentCategories);
    }
  };
  const retrieveHotel = () => {
    const retrievedArrayString= localStorage.getItem("hotels")
    if (retrievedArrayString){
      const hotelFound = JSON.parse(retrievedArrayString)
      setHotels(hotelFound)
    }
  };
  useEffect(() => {
    fetchCategories();
    retrieveHotel();
  }, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { value } = e.target;
    setSelectedCategory(value);
    setFilter(true)
  };
  const search =()=>{
    setFilter(false)
    const results:Hotel[] = hotels.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
    setHotels(results);
  }
  const cancelSearch =()=>{
    retrieveHotel()
  }

  const deleteHotel =(name:string) => {
    const availableHotels = hotels.filter(hotel => hotel.name !== name);
    setHotels(availableHotels);
    localStorage.setItem("hotels", JSON.stringify(availableHotels))
  }
  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 mt-16">
        <button onClick={() => router.push('/createHotel')}
                className="bg-blue-500 text-white py-2 px-4 mt-2 rounded hover:bg-blue-600">
          Add Hotel
        </button>

        <div>
        <button className="bg-blue-500 text-white py-2 px-4 mt-2 rounded hover:bg-blue-600">
          Filter By Category
          <select
              name="categories"
              id="categories"
              value={selectedCategory}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select a category</option>
            {categories.map((value, index) => (
                <option key={index} value={value}>
                  {value}
                </option>
            ))}
          </select>
        </button>
          <button onClick={() => setFilter(false)}>
            Cancel Filter
          </button>
        </div>


        <div>
        <input type="text"
               id="searchInput"
               placeholder="Search..."
               className={"bg-amber-300 h-10 w-44"}
               value={query}
               onChange={(e) => setQuery(e.target.value)}
        />
          <button onClick={search}>
            Search
          </button>
          <button onClick={cancelSearch}>
            X
          </button>
        </div>


        {hotels.map((hotel) => (
            <>
            {isFilter? DisplayCardWithFilter(hotel, selectedCategory, deleteHotel) :DisplayCard(hotel, deleteHotel)}
                </>
            ))
        }
      </div>
  )
}

function DisplayCard(hotel: Hotel, deleteHotel: (name: string) => void) {
  return <Card
      key={hotel.name}
      width="w-full"
      height="h-64"

  >
    <h3 className="text-lg font-bold">{hotel.name}</h3>
    <p className="text-gray-700">{hotel.country}, {hotel.address}</p>
    <p className="text-gray-500">{hotel.description}</p>
    <p className="text-yellow-500">Rating: {hotel.rating} ⭐</p>
    <div>
      <button className="bg-blue-500 text-white py-2 px-4 mt-2 rounded hover:bg-blue-600">
        Rate Hotel
      </button>
      <button onClick={() => deleteHotel(hotel.name)}
              className="bg-blue-500 text-white py-2 px-4 mt-2 rounded hover:bg-blue-600">
        Delete Hotel
      </button>
    </div>
  </Card>;
}

function DisplayCardWithFilter(hotel: Hotel, selectedCategory: string | undefined, deleteHotel: (name: string) => void) {
  return<>
    {selectedCategory?.toLowerCase() === hotel.category.toLowerCase()? (<Card
        key={hotel.name}
        width="w-full"
        height="h-64"

    >
      <h3 className="text-lg font-bold">{hotel.name}</h3>
      <p className="text-gray-700">{hotel.country}, {hotel.address}</p>
      <p className="text-gray-500">{hotel.description}</p>
      <p className="text-yellow-500">Rating: {hotel.rating} ⭐</p>
      <div>
        <button className="bg-blue-500 text-white py-2 px-4 mt-2 rounded hover:bg-blue-600">
          Rate Hotel
        </button>
        <button onClick={() => deleteHotel(hotel.name)}
                className="bg-blue-500 text-white py-2 px-4 mt-2 rounded hover:bg-blue-600">
          Delete Hotel
        </button>
      </div>
    </Card>) : null}
  </>
}

export default Hotels