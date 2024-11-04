"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/button";
import Search from "@/components/search";
import Filter from "@/components/filter";
import HotelCard from "@/components/hotelCard";
import Modal from "@/components/modal";
import EditHotelForm from "@/components/editHotelForm";
// import EditHotelForm from "@/components/editHotelForm";
// import Modal from "@/components/modal";

export interface Hotel {
  id: number;
  name: string;
  country: string;
  address: string;
  description: string;
  rating: number;
  // imageSrc: string;
  image: string;
  category: string;
}

const Hotels = () => {
  const router = useRouter();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [categories, setCategories] = useState<string[]>([
    "1 Star",
    "2 Star",
    "3 Star",
  ]);

  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isFilter, setFilter] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();

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
    const results: Hotel[] = hotels.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setHotels(results);
  };

  const cancelSearch = () => {
    setQuery("");
    retrieveHotels();
  };

  const deleteHotel = (name: string) => {
    const availableHotels = hotels.filter((hotel) => hotel.name !== name);
    setHotels(availableHotels);
    localStorage.setItem("hotels", JSON.stringify(availableHotels));
  };

  const handleClick = () => {
    router.push("/createHotel");
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

  const handleEditHotel = (hotel: Hotel) => {
    console.log("Edit Hotel clicked:", hotel);

    setSelectedHotel(hotel);
    setShowEditModal(true);
  };

  const handleUpdateHotel = (updatedHotel: Partial<Hotel>) => {
    if (selectedHotel) {
      const updatedHotels = hotels.map(
        (hotel) =>
          hotel.id === selectedHotel.id ? { ...hotel, ...updatedHotel } : hotel 
      );
      localStorage.setItem("hotels", JSON.stringify(updatedHotels));
      setHotels(updatedHotels);
      setShowEditModal(false);
      setSelectedHotel(null);
    }
  };

  //   const handleEditHotel = (hotel: Hotel) => {
  //     setSelectedHotel(hotel);
  //     setShowEditModal(true);
  // };
  // const handleUpdateHotel = (updatedHotel: Partial<Hotel>) => {
  //   const updatedHotels = hotels.map(hotel =>
  //       hotel.name === updatedHotel.name ? updatedHotel : hotel
  //   );
  //   localStorage.setItem('hotels', JSON.stringify(updatedHotels));
  //   setHotels(updatedHotels);
  //   setShowEditModal(false);
  //   setSelectedHotel(null);
  // };
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-24 md:ml-16 ml-4">
        <Button width="w-28" text="Add Hotel" onClick={handleClick} />
        <Search
          query={query}
          setQuery={setQuery}
          onSearch={search}
          onCancel={cancelSearch}
        />
        <Filter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onFilter={handleFilter}
          onCancelFilter={cancelFilter}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 mt-4">
        {hotels.map((hotel) => {
          if (isFilter && selectedCategory) {
            return selectedCategory.toLowerCase() ===
              hotel.category.toLowerCase() ? (
              <HotelCard
                key={hotel.name}
                hotel={hotel}
                onDelete={deleteHotel}
                isActive={activeHotel === hotel.name}
                onCardClick={handleCardClick}
                handleEditHotel={handleEditHotel}
              />
            ) : null;
          }
          return (
            <HotelCard
              key={hotel.name}
              hotel={hotel}
              onDelete={deleteHotel}
              isActive={activeHotel === hotel.name}
              onCardClick={handleCardClick}
              handleEditHotel={handleEditHotel}
            />
          );
        })}
      </div>
      {showEditModal && selectedHotel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 h-96">
            <Modal>
              <EditHotelForm
                hotel={selectedHotel}
                onUpdateHotel={handleUpdateHotel}
                onClose={() => setShowEditModal(false)}
              />
            </Modal>
          </div>
        </div>
      )}
    </>
  );
};

export default Hotels;
