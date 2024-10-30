"use client";
import React, { ReactNode, useState } from "react";
import Logo from "./logo";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

type NavbarProps = {
  children: ReactNode;
};

const Navbar: React.FC<NavbarProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  return (
    <nav className="nav-bar bg-black bg-opacity-70 fixed top-0 left-0 w-full p-4 md:px-8 flex justify-between items-center z-50">
      <Logo />
      <div className="hidden md:flex">{children}</div>
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          className="text-white"
        >
          {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-black bg-opacity-90 text-white shadow-md p-4 md:hidden">
          {children}
        </div>
      )}
    </nav>
  );
};
export default Navbar;
