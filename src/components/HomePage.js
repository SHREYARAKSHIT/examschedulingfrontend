import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Hii this is Exam Scheduling System</h1>
      <div className="space-x-4">
        <Link to="/signup" className="bg-green-500 text-white px-4 py-2 rounded">Sign Up</Link>
        <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded">Login</Link>
      </div>
    </div>
  );
}
