import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./components/Login";
import Signup from "./components/Signup";  // Import Signup component
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import axios from "axios";
import UploadFiles from "./components/UploadFiles";
import ScheduleView from "./components/ScheduleView";
import HomePage from "./components/HomePage";  // Import HomePage component
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import HallView from "./components/HallView";
import SeatingPlanView from "./components/SeatingPlanView"
import logoutUser from "./components/logout";
import { useNavigate } from "react-router-dom";



export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsAuthenticated(true);
      // Optionally, verify token validity with backend
    }
  }, []);

/*
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Home page route }
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup />} />  {/* Signup route }
        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <UploadFiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/schedule"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ScheduleView />
            </ProtectedRoute>
          }
        />
        
        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} />} />
      </Routes>
    </Router>
  );*/

  return (
    <Router>
      <Toaster position="top-right" />
      
      {isAuthenticated ? (

      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
        <div className="flex flex-1">
          {/* Sidebar */}
          <Sidebar />
          
          <div className="flex-1 p-6">
            <Routes>
              
              
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/upload"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <UploadFiles />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/schedule"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <ScheduleView />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/hall"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <HallView />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/seatingplan"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <SeatingPlanView />
                  </ProtectedRoute>
                }
              />
              
              <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} />} />
            </Routes>
          </div>
        </div>
        
        {/* Footer */}
        <Footer />
      </div>
      ) : (
        <div className="h-screen bg-gradient-to-r from-indigo-100 via-indigo-200 to-indigo-300">
      <div className="h-full flex items-center justify-center">
          {/* Show Login or Signup before login */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
        </div>
      )}
    </Router>
  );
}

