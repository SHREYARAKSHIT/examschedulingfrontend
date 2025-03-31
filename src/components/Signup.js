import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function Signup() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/auth/signup", formData);
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form className="p-6 bg-white shadow-md rounded" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">Sign Up</h2>
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required className="block border p-2 w-full mb-3"/>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="block border p-2 w-full mb-3"/>
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="block border p-2 w-full mb-3"/>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Sign Up</button>
      </form>
    </div>
  );
}
