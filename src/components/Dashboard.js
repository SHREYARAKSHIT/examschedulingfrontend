import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <h2>Welcome to the Exam Scheduler Dashboard</h2>
      <nav>
        <ul>
          <li><Link to="/upload">Upload Exam Data</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
