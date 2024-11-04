import React from 'react'

interface ModalProps {
  children: React.ReactNode;
}
 
const Modal: React.FC<ModalProps>  = ({children}) => {
  
  return (

    <div className='border-2 p-4 w-full h-64'>

      {children}
     
       
    </div>
  )
}

export default Modal;