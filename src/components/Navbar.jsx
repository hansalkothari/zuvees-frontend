import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear localStorage values
    localStorage.removeItem('email');
    localStorage.removeItem('role');

    // Redirect to home
    navigate('/');
  };

  // Get role from localStorage
  const role = localStorage.getItem('role');

  return (
    <nav className="flex items-center h-14 bg-[#146eb4] px-4">
      <div className="logo flex-grow">
        <p className="text-[#f2f2f2] text-2xl font-semibold">PLAY ZONE</p>
      </div>
      <div className="flex space-x-6">
        {/* Show Home and Cart if role is customer */}
        {role === 'customer' && (
          <>
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
          </>
        )}

        {/* Always show logout button if logged in (role exists) */}
        {role && (
          <button
            onClick={handleLogout}
            className="text-[#f2f2f2] hover:text-yellow-400 transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
