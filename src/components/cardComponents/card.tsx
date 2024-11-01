import React from 'react'
import Image from "next/image";


interface CardProps {
    children: React.ReactNode; 
    width?: string; 
    height?: string; 
    backgroundColor?: string; 
    className?: string; 
    icon?: React.ReactNode;
    imageSrc?: string;
  }

const Card: React.FC<CardProps> = ({children,
    width = 'w-80', 
    height = 'h-48', 
 
    backgroundColor = 'bg-white', 
    className = '',
    imageSrc, 
    icon,
 }) => {
  return (
    <div
      className={`flex flex-col mt-8 p-4 shadow-lg rounded-lg ${backgroundColor} ${width} ${height} ${className}`}
    >
      {imageSrc && (
        <Image
          src={imageSrc}
          alt="Card Image"
          className={`mb-2 rounded-lg ${width} ${height} object-cover`}
        />
      )}
      {icon && <div className="mb-2">{icon}</div>} 
      <div>{children}</div>
    </div>
  )
}

export default Card