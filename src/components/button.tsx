
import React from 'react';

interface ButtonProps {
  text?: string;
  onClick?: () => void;
  width?: string;
  height?: string;
  color?: string;
  textColor?: string;
}

const Button: React.FC<ButtonProps> = ({

  text = "Click Me",
  onClick,
  width = "w-auto",
  height = "h-12",
  color = "bg-blue-500",
  textColor = "text-white"
}) => {
  return (
    <button
      onClick={onClick}
      className={`${width} ${height} ${color} ${textColor} py-2 px-4 rounded-md hover:opacity-90 transition duration-300`}
    >
 
      {text}
    </button>
  );
};

export default Button;
