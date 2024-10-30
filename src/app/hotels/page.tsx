"use client";

import Card from '@/components/cardComponents/card';
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import Button from '@/components/button';
import Search from '@/components/search';
import Filter from '@/components/filter';

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

const Hotels = () => {
  const router = useRouter();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [categories, setCategories] = useState<string[]>(['1 Star', '2 Star', '3 Star']);
  const [isFilter, setFilter] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();

  const fetchCategories = () => {
    const categoriesString = localStorage.getItem("categories");
    if (categoriesString) {
      const currentCategories = JSON.parse(categoriesString);
      setCategories(currentCategories);
    }
  };

  const retrieveHotels = () => {
    const retrievedArrayString = localStorage.getItem("hotels");
    if (retrievedArrayString) {
      const hotelsFound = JSON.parse(retrievedArrayString);
      setHotels(hotelsFound);
    }
  };

  useEffect(() => {
    fetchCategories();
    retrieveHotels();
  }, []);

  // const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const { value } = e.target;
  //   setSelectedCategory(value);
  //   setFilter(true);
  // };

  const search = () => {
    setFilter(false);
    const results: Hotel[] = hotels.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setHotels(results);
  };

  const cancelSearch = () => {
    setQuery('');
    retrieveHotels();
  };

  const deleteHotel = (name: string) => {
    const availableHotels = hotels.filter(hotel => hotel.name !== name);
    setHotels(availableHotels);
    localStorage.setItem("hotels", JSON.stringify(availableHotels));
  };

  const handleClick = () => {
    router.push('/createHotel');
  };

  const handleFilter = () => {
    setFilter(true);
  };

  const cancelFilter = () => {
    setSelectedCategory(undefined);
    setFilter(false);
    retrieveHotels(); 
  };

  const renderHotelCard = (hotel: Hotel) => (
    <Card key={hotel.name} width="w-full" height="h-64">
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
    </Card>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 mt-16">
      <Button width="w-28" text="Add Hotel" onClick={handleClick} />
      <Search query={query} setQuery={setQuery} onSearch={search} onCancel={cancelSearch} />
      <Filter 
        categories={categories} 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
        onFilter={handleFilter} 
        onCancelFilter={cancelFilter} 
       
      />

      {hotels.map(hotel => {
        if (isFilter && selectedCategory) {
          return selectedCategory.toLowerCase() === hotel.category.toLowerCase()
            ? renderHotelCard(hotel)
            : null;
        }
        return renderHotelCard(hotel);
      })}
    </div>
  );
};

export default Hotels;
