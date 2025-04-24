// src/utils/logout.js
import axios from "axios";
import toast from "react-hot-toast";

const logoutUser = async ({setIsAuthenticated, navigate}) => {
  const token = localStorage.getItem("access_token");
  if (!token) return;

  try {
    await axios.post(
      "http://localhost:5000/api/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    localStorage.removeItem("access_token");
    navigate('/login')
    setIsAuthenticated(false);
    toast.success("Logged out successfully!");
  } catch (err) {
    console.error(err.response?.data || err.message);
    alert("Logout failed!");
  }
};

export default logoutUser;
