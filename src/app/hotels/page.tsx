
"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import Button from '@/components/button';
import Search from '@/components/search';
import Filter from '@/components/filter';
import HotelCard from '@/components/hotelCard';


export interface Hotel {
  id: number;
  name: string;
  country: string;
  address: string;
  description: string;
  rating: number;
  // imageSrc: string;
  image:string;
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

  const [activeHotel, setActiveHotel] = useState<string | null>(null);

 

  const handleCardClick = (name: string) => {
    setActiveHotel((prev) => (prev === name ? null : name)); 
  };
  return (
    <>
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-24 md:ml-16 ml-4'>
     <Button width="w-28" text="Add Hotel" onClick={handleClick} />
      <Search query={query} setQuery={setQuery} onSearch={search} onCancel={cancelSearch} />
      <Filter 
        categories={categories} 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
        onFilter={handleFilter} 
        onCancelFilter={cancelFilter} 
      />
    </div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 mt-4">
    

      {hotels.map(hotel => {
        if (isFilter && selectedCategory) {
          return selectedCategory.toLowerCase() === hotel.category.toLowerCase()
            ? <HotelCard key={hotel.name} hotel={hotel} onDelete={deleteHotel} isActive={activeHotel === hotel.name}
            onCardClick={handleCardClick}/> 
            : null;
        }
        return <HotelCard key={hotel.name} hotel={hotel} onDelete={deleteHotel} isActive={activeHotel === hotel.name}
        onCardClick={handleCardClick}/>; 
      })}
    </div>
    </>
    
  );
};

export default Hotels;
