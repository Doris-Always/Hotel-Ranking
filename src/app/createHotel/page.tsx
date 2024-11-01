"use client";

import Card from "@/components/cardComponents/card";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from 'axios';
import Modal from "@/components/modal";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const imagesArray = [
  '/executive-room2.jpg', 
  '/single-executive.jpg',
  '/executive-room2.jpg',
  '/single-executive.jpg',

];

const CreateHotel = () => {
  const router = useRouter();
  const [countries, setCountries] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>(['1 Star', '2 Star', '3 Star']);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  type Country = {
    name: {
      common: string;
    };
  };
  
  type Hotel = {
    name: string;
    country: string;
    address: string;
    category: string;
    description: string;
    image: string;
  };
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    address: "",
    category: "1 Star",
    description: "",
    image: "", 
  });

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countryNames = response.data.map((country: Country) => country.name.common);
        setCountries(countryNames);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }

      const categoriesString = localStorage.getItem("categories");
      if (categoriesString) {
        setCategories(JSON.parse(categoriesString));
      }
    };

    fetchCountries();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name) {
      toast('Please fill in the hotel name');
      return;
    }
    if (!formData.country) {
      toast('Please fill in the country field');
      return;
    }

    const retrievedArrayString = localStorage.getItem("hotels");
   
    const hotelsFound: Hotel[] = retrievedArrayString ? JSON.parse(retrievedArrayString) : [];

    const hotelExists = hotelsFound.some((hotel: Hotel) => hotel.name.toLowerCase() === formData.name.toLowerCase());
    if (hotelExists) {
      toast('Hotel name has been taken. Please pick a new name');
      return;
    }
    const randomImage = imagesArray[Math.floor(Math.random() * imagesArray.length)];
    
    const newHotel = { ...formData, image: randomImage };
    hotelsFound.unshift(newHotel);
    localStorage.setItem("hotels", JSON.stringify(hotelsFound));
    console.log("Form submitted:", newHotel);
    router.push('/hotels');
  };

  const toggleModal = () => setShowModal(prev => !prev);

  const handleAddCategory = (newCategory: string) => {
    const categoriesString = localStorage.getItem("categories");
    const currentCategories = categoriesString ? JSON.parse(categoriesString) : ['1 Star', '2 Star', '3 Star'];

    if (!currentCategories.includes(newCategory)) {
      currentCategories.unshift(newCategory);
      localStorage.setItem("categories", JSON.stringify(currentCategories));
      setCategories(currentCategories);
    }

    setShowModal(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen mt-10">
      <ToastContainer />
      <Card width="w-96" height="h-auto">
        <div className="w-full h-32 relative">
          <Image
            src="/single-executive.jpg"
            alt="Hotel"
            fill
           style={{ objectFit: 'cover' }}
            className="mb-2 rounded-t-lg object-cover"
          />
        </div>
        <h2 className="text-2xl font-bold mb-4 mt-4">Create Hotel</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1" htmlFor="name">Hotel Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
            {error && <p className="text-red-500">{error}</p>}
          </div>

          <div>
            <label className="block mb-1" htmlFor="country">Country:</label>
            <select
              name="country"
              id="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select a country</option>
              {countries.map((country, index) => (
                <option key={index} value={country}>{country}</option>
              ))}
            </select>
            {error && <p className="text-red-500">{error}</p>}
          </div>

          <div>
            <label className="block mb-1" htmlFor="address">Address:</label>
            <input
              type="text"
              name="address"
              id="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex justify-between items-center">
            <div>
              <label className="block mb-1" htmlFor="category">Category:</label>
              <select
                name="category"
                id="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <button
              type="button"
              className="bg-blue-500 mt-5 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
              onClick={toggleModal}
            >
              Add Category
            </button>
          </div>

          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96 h-96">
                <Modal onAddCategory={handleAddCategory} />
                <button
                  onClick={toggleModal}
                  className="mt-4 bg-gray-300 text-gray-700 py-1 px-4 rounded hover:bg-gray-400 transition duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          <div>
            <label className="block mb-1" htmlFor="description">Description:</label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </form>
      </Card>
    </div>
  );
};

export default CreateHotel;
