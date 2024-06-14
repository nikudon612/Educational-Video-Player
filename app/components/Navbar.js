"use client";
import React, { useState } from "react";
import Link from "next/link";
import { user_id } from "../lib/api"; // Importing user_id

const Navbar = () => {
  const [hovered, setHovered] = useState(null);

  const handleMouseEnter = (item) => {
    setHovered(item);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  return (
    <header className="text-black p-4 mx-auto">
      <nav className="flex flex-row justify-between items-center relative">
        <Link href="/" className="relative">
          <img src="/FULL_LOGO_COLOR.png" alt="Logo" className="w-32" />
        </Link>
        <div className="flex items-end space-x-4">
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('upload')}
            onMouseLeave={handleMouseLeave}
          >
            <Link href="/videos/new" className="text-3xl text-gray-600" alt="Upload video">
              +
            </Link>
            {hovered === 'upload' && (
              <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-32 bg-gray-700 text-white text-center rounded-lg p-1">
                Upload Video
              </div>
            )}
          </div>
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('user')}
            onMouseLeave={handleMouseLeave}
          >
            <span className="text-lg text-[#47b99b] cursor-pointer">{user_id}</span>
            {hovered === 'user' && (
              <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-32 bg-gray-700 text-white text-center rounded-lg p-1">
                Current User
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
