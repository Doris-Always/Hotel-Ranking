"use client"
import Button from '@/components/button'
import Card from '@/components/cardComponents/card'
import Hero from '@/components/heroComponent/hero'
import HeroContents from '@/components/heroComponent/heroContents'
import Modal from '@/components/modal'
import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'

const Categories = () => {
    const [categories, setCategories] = useState<string[]>(['1 star', '2 star', '3 star']);
    const [showModal, setShowModal] = useState(false);
    
    useEffect(() => {
        const fetchCategories = async () => {
            const categoriesString = localStorage.getItem("categories");
            if (categoriesString) {
                const currentCategories = JSON.parse(categoriesString);
                setCategories(currentCategories);
            }
        };
        fetchCategories();
    }, []);

    const toggleModal = () => {
        setShowModal((prev) => !prev);
      };


    const handleClick=()=>{
        setShowModal(true)
    }

    const handleAddCategory = (newCategory: string) => {

        const categoriesString= localStorage.getItem("categories")
        if (categoriesString){
          let currentCategories = JSON.parse(categoriesString)
          if (!currentCategories.includes(newCategory)) {
            currentCategories.unshift(newCategory)
          }else if (currentCategories.length === 0){
            currentCategories = ['1 star', '2 star', '3 star']
          }
          localStorage.setItem("categories", JSON.stringify(currentCategories))
        }else {
          const currentCategories = ['1 Star', '2 Star', '3 Star', newCategory]
          localStorage.setItem("categories", JSON.stringify(currentCategories))
        }
        if (newCategory && !categories.includes(newCategory)) {
          setCategories([...categories, newCategory]);
        }
        setShowModal(false);
      };

    return (
        <>
        <Hero>
        <HeroContents paragraph={"View Categories and Add Custom Ones"}/>
        </Hero> 
        
        <div className='mt-8 flex justify-end mr-12'>
        <Button text="Add Category" onClick={handleClick} />
        </div>
        {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 h-96">
            <Modal onAddCategory={handleAddCategory}/>
            <button
              onClick={toggleModal}
              className="mt-4 bg-gray-300 text-gray-700 py-1 px-4 rounded hover:bg-gray-400 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}


        <div className="flex flex-wrap gap-6 p-4 justify-center mt-12">
            {categories.map((category, index) => {
            
                const starCount = parseInt(category);

                return (
                    <Card key={index} className="w-64 p-4 bg-white shadow-lg rounded-lg border border-gray-200 text-center">
                        <p className="text-lg font-bold text-gray-800">{category}</p>
                        <div className="flex justify-center items-center mt-2">
                            {Array.from({ length: starCount }, (_, i) => (
                                <FaStar key={i} className="text-yellow-500" />
                            ))}
                        </div>
                    </Card>
                );
            })}
        </div>
        </>
       
    );
}

export default Categories;
