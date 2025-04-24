// components/Sidebar.js
/*import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <ul>
        <li><Link to="/dashboard" className="block py-2">Dashboard</Link></li>
        <li><Link to="/upload" className="block py-2">Upload Files</Link></li>
        <li><Link to="/schedule" className="block py-2">View Schedule</Link></li>
        <li><Link to="/hall" className="block py-2">View Hall Allocation</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;

import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <ul>
        <li>
          <Link 
            to="/dashboard" 
            className="block py-2 px-4 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link 
            to="/upload" 
            className="block py-2 px-4 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200"
          >
            Upload Files
          </Link>
        </li>
        <li>
          <Link 
            to="/schedule" 
            className="block py-2 px-4 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200"
          >
            View Schedule
          </Link>
        </li>
        <li>
          <Link 
            to="/hall" 
            className="block py-2 px-4 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200"
          >
            View Hall Allocation
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;*/

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation(); // Get current route

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <ul>
        <li>
          <Link 
            to="/dashboard" 
            className={`block py-2 px-4 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 
              ${location.pathname === "/dashboard" ? "bg-gray-700 text-white" : ""}`}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link 
            to="/upload" 
            className={`block py-2 px-4 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 
              ${location.pathname === "/upload" ? "bg-gray-700 text-white" : ""}`}
          >
            Generate Exam Timetable & Hall Allocation
          </Link>
        </li>
        <li>
          <Link 
            to="/schedule" 
            className={`block py-2 px-4 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 
              ${location.pathname === "/schedule" ? "bg-gray-700 text-white" : ""}`}
          >
            View Schedule
          </Link>
        </li>
        <li>
          <Link 
            to="/hall" 
            className={`block py-2 px-4 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 
              ${location.pathname === "/hall" ? "bg-gray-700 text-white" : ""}`}
          >
            View Venue Allocation
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;

