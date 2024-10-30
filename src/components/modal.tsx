import React, { useState } from 'react'

interface ModalProps {
    onAddCategory: (category: string) => void;
  }

const Modal: React.FC<ModalProps>  = ({ onAddCategory }) => {

    const [categoryName, setCategoryName] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setCategoryName(event.target.value);
    };
  
    const handleAddCategory = () => {
        if (categoryName.trim()) {
            onAddCategory(categoryName.trim());
            setCategoryName(''); // Clear input after adding
          }
   
    };
  
  return (

    <div className='border-2 p-4 w-full h-64'>
        <h2 className='text-2xl font-bold mb-3'>
            Add Custom Category
        </h2>
        <input
              type="text"
              value={categoryName}
              onChange={handleInputChange}
              placeholder="Enter category name"
              required
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
              {/* {error && <p className="text-red-500">{error}</p>} */}

              <button
            type="submit"
            onClick={handleAddCategory}
            className="w-full bg-blue-500  text-white py-2 my-4 rounded hover:bg-blue-600 transition duration-300"
          >
            Add
          </button>
    </div>
  )
}

export default Modal;