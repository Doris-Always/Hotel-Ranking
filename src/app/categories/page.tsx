"use client"
import Card from '@/components/cardComponents/card'
import React, {useEffect, useState} from 'react'

const Categories= () => {
    const [categories, setCategories] = useState<string[]>(['1 star', '2 star', '3 star']);
    useEffect(() => {
        const fetchCountries = async () => {
            const categoriesString= localStorage.getItem("categories")
            if (categoriesString) {
                const currentCategories = JSON.parse(categoriesString)
                setCategories(currentCategories);
            }
        };
        fetchCountries();
    }, []);
  return (
    <>
        {categories.map((category) => (
            <>
                <Card>
                    <p>{category}</p>
                </Card>
            </>
            ))
        }
    </>
  )
}

export default Categories