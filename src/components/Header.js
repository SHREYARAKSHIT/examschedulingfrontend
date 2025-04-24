import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoutUser from './logout';
import { User, LogOut, CircleUser} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /*return (
    <header className="bg-white shadow-lg p-4 flex justify-between items-center border-b-2 border-gray-200">
      {/* Logo and App Title }
      <div className="flex items-center space-x-4">
        <img
          src="/images/iit_ism_logo.png" // Path to your IIT ISM logo
          alt="IIT ISM Dhanbad"
          className="w-10 h-10 rounded-full border-2 border-gray-300"
        />
        <h1 className="text-2xl font-semibold text-gray-800">Exam Scheduler</h1>
      </div>

      {/* Authentication Links }
      {isAuthenticated && (
        <div className="flex items-center space-x-6">
          <Link to="/profile" className="text-gray-600 hover:text-blue-600 transition duration-200">
            Profile
          </Link>

          <button
            onClick={() => logoutUser({setIsAuthenticated, navigate})}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;*/
return (
  <header className="bg-white shadow-lg p-4 flex justify-between items-center border-b-2 border-gray-200">
    {/* Logo and App Title */}
    <div className="flex items-center space-x-4">
      <img
        src="/iit_ism_logo.svg.png"
        alt="IIT ISM Dhanbad"
        className="w-10 h-10 object-contain" //rounded-full border-2 border-gray-300 
      />
      <h1 className="text-2xl font-semibold text-gray-800">Exam Scheduler</h1>
    </div>

    {/* Profile Dropdown */}
    {isAuthenticated && (
      <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="transition-all duration-300 ease-in-out"
          >
            <CircleUser className="w-9 h-9 text-gray-600 hover:text-gray-800 cursor-pointer transform hover:scale-110 transition-transform duration-200"  />
          </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div
              className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
              onClick={() => {
                //navigate('/profile');
                setIsOpen(false);
              }}
            >
              <User className="w-4 h-4" /> Profile
            </div>
            <div
              className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
              onClick={() => logoutUser({setIsAuthenticated, navigate})}
            >
              <LogOut className="w-4 h-4" /> Logout
            </div>
          </div>
        )}
      </div>
    )}
  </header>
);
};

export default Header;

