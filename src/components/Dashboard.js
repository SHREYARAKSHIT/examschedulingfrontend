/*import React from "react";
import { Link, useNavigate } from "react-router-dom";


const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/*<button onClick={() => logoutUser(navigate)} style={{ cursor: 'pointer', marginTop: '10px' }}>
        Logout
      </button>}
      <h2>Welcome to the Exam Scheduler Dashboard</h2>
      <nav>
        <ul>
          <li><Link to="/upload">Upload Exam Data</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;*/

import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-xl mx-auto text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Welcome to the Exam Scheduler Dashboard
        </h2>

        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                to="/upload"
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
              >
                Upload Exam Data
              </Link>
            </li>
            {/* Add more dashboard options here if needed */}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Dashboard;

