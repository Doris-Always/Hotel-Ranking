import React from 'react'

interface TextInputProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
  }
const Input: React.FC<TextInputProps>  = ({value, onChange, placeholder, className}) =>{
    return(
        <>
        <div>
        <h2 className='text-2xl font-bold mb-3'>
            Add Custom Category
        </h2>
        <input
              type="text"
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              required
              className={`w-full p-2 border border-gray-300 rounded mb-4 ${className}`}
            />
        </div>
       
        </>
    )
}
export default Input;