import React from 'react'

// interface ModalProps {
//     onAddCategory: (category: string) => void;
//   }
interface ModalProps {
  children: React.ReactNode;
}
  // const Modal: React.FC<ModalProps>  = ({children, onAddCategory })
const Modal: React.FC<ModalProps>  = ({children}) => {

    // const [categoryName, setCategoryName] = useState('');

    // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //   setCategoryName(event.target.value);
    // };
  
    // const handleAddCategory = () => {
    //     if (categoryName.trim()) {
    //         onAddCategory(categoryName.trim());
    //         setCategoryName('');
    //       }
   
    // };
  
  return (

    <div className='border-2 p-4 w-full h-64'>

      {children}
        {/* <h2 className='text-2xl font-bold mb-3'>
            Add Custom Category
        </h2> */}
        {/* <input
              type="text"
              value={categoryName}
              onChange={handleInputChange}
              placeholder="Enter category name"
              required
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            

              <button
            type="submit"
            onClick={handleAddCategory}
            className="w-full bg-blue-500  text-white py-2 my-4 rounded hover:bg-blue-600 transition duration-300"
          >
            Add
          </button> */}
    </div>
  )
}

export default Modal;