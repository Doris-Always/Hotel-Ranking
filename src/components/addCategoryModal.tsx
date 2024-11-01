import React, { useState } from 'react';
import Input from './input';
import Modal from './modal';


interface AddCategoryModalProps {
  onAddCategory: (category: string) => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ onAddCategory }) => {
  const [categoryName, setCategoryName] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value);
  };

  const handleAddCategory = () => {
    if (categoryName.trim()) {
      onAddCategory(categoryName.trim());
      setCategoryName('');
    }
  };

  return (
    <Modal>
      <Input
        value={categoryName}
        onChange={handleInputChange}
        placeholder="Enter category name"
      />
      <button
        type="button"
        onClick={handleAddCategory}
        className="w-full bg-blue-500 text-white py-2 my-4 rounded hover:bg-blue-600 transition duration-300"
      >
        Add
      </button>
    </Modal>
  );
};

export default AddCategoryModal;
