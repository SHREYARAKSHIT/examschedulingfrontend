// src/utils/logout.js
import axios from "axios";
import toast from "react-hot-toast";

const logoutUser = async ({setIsAuthenticated, navigate}) => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    setIsAuthenticated(false);
    navigate("/login");
    return;
  }

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

    toast.success("Logged out successfully!");
  } catch (err) {
    const status = err.response?.status;
    const message = err.response?.data?.msg;

    if (status === 401 && message?.includes("Token has expired")) {
      toast.info("Session expired. Logging out...");
    } else {
      console.error("Logout error:", err.response?.data || err.message);
      //toast.error("Logout failed!");
    }
  } finally{
    localStorage.removeItem("access_token");
    navigate('/login')
    setIsAuthenticated(false);
  }
};

export default logoutUser;
