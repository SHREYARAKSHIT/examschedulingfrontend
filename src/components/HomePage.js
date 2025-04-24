/*port React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Exam Scheduling System</h1>
      <div className="space-x-4">
        <Link to="/signup" className="bg-green-500 text-white px-4 py-2 rounded">Sign Up</Link>
        <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded">Login</Link>
      </div>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-lg border border-gray-200 rounded-xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Welcome to the Exam Scheduling System</h1>
        <p className="text-gray-600 mb-6">Efficiently manage your exam schedule and venue allocations with ease.</p>
        
        <div className="flex justify-center space-x-4">
          <Link
            to="/signup"
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-medium transition duration-200"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition duration-200"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#f0f4f8] to-[#e2e8f0] px-4">
      <div className="bg-white border border-gray-200 shadow-2xl rounded-2xl p-10 max-w-lg w-full text-center">
        <h1 className="text-4xl font-semibold text-indigo-800 mb-4">Exam Scheduling System</h1>
        <p className="text-gray-600 text-sm mb-8">Streamline your exam planning with automated schedule and venue allocation.</p>

        <div className="flex justify-center space-x-6">
          <Link
            to="/signup"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-full text-sm font-semibold transition duration-200 shadow-md"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full text-sm font-semibold transition duration-200 shadow-md"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}


import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-100 via-indigo-200 to-indigo-300 px-4">
      <div className="bg-white border border-gray-200 shadow-2xl rounded-2xl p-12 max-w-lg w-full text-center">
        <h1 className="text-4xl font-semibold text-indigo-800 mb-4">Exam Scheduling System</h1>
        <p className="text-gray-600 text-lg mb-8">Streamline your exam planning with automated scheduling and venue allocation.</p>

        <div className="flex justify-center space-x-8">
          <Link
            to="/signup"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition duration-200 shadow-lg"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition duration-200 shadow-lg"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}*/
/*import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-indigo-200 to-indigo-300 flex items-center justify-center px-4">
      <div className="bg-white border border-gray-200 shadow-2xl rounded-2xl p-12 max-w-lg w-full text-center">
        <h1 className="text-4xl font-semibold text-indigo-800 mb-4">Exam Scheduling System</h1>
        <p className="text-gray-600 text-lg mb-8">Streamline your exam planning with automated scheduling and venue allocation.</p>

        <div className="flex justify-center space-x-8">
          <Link
            to="/signup"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition duration-200 shadow-lg"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition duration-200 shadow-lg"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};*/
import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    // div className="min-h-screen bg-gradient-to-r from-indigo-100 via-indigo-200 to-indigo-300 flex items-center justify-center px-4">
      <div className="bg-white border border-gray-200 shadow-2xl rounded-2xl p-12 max-w-lg w-full text-center">
        <h1 className="text-4xl font-semibold text-indigo-800 mb-4">Exam Scheduling System</h1>
        <p className="text-gray-600 text-lg mb-8">Streamline your exam planning with automated scheduling and venue allocation.</p>

        <div className="flex justify-center space-x-8">
          <Link
            to="/signup"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition duration-200 transform hover:scale-105"
            aria-label="Sign Up"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition duration-200 transform hover:scale-105"
            aria-label="Login"
          >
            Login
          </Link>
        </div>
      </div>
    //</div>
  );
}
