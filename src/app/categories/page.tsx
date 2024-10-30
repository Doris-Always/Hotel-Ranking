"use client"
import Card from '@/components/cardComponents/card'
import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'

const Categories = () => {
    const [categories, setCategories] = useState<string[]>(['1 star', '2 star', '3 star']);

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

    return (
        <div className="flex flex-wrap gap-6 p-4 justify-center">
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
    );
}

export default Categories;
