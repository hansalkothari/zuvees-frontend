import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex items-center h-14 bg-[#146eb4] px-4">
      <div className="logo flex-grow">
        <p className="text-[#f2f2f2] text-2xl font-semibold">PLAY ZONE</p>
      </div>
      <div className="flex space-x-6">
        <Link
          to="/customer-home"
          className="text-[#f2f2f2] hover:text-yellow-400 transition"
        >
          Home
        </Link>
        <Link
          to="/cart"
          className="text-[#f2f2f2] hover:text-yellow-400 transition"
        >
          Cart
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
