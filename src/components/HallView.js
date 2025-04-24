import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const HallView = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('access_token');

  const fetchPDF = async () => {
    if (!token) {
      toast.error("No access token found.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("http://127.0.0.1:5000/api/hall/view", {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        responseType: "blob"
      });

      if (response.status === 200) {
        const file = new Blob([response.data], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      } else {
        console.error("Unexpected response status:", response.status);
        setError("Error: Unexpected response status");
        toast.error("Unexpected response from server.");
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);

      if (error.response) {
        console.error("Server responded with error:", error.response);
        setError(`Error: ${error.response.data.error || 'Something went wrong'}`);
        toast.error(error.response.data.error || "Error loading schedule PDF.");
      } else if (error.request) {
        console.error("No response received:", error.request);
        setError("Error: No response from server.");
        toast.error("No response from server.");
      } else {
        console.error("Error during request setup:", error.message);
        setError(`Error: ${error.message}`);
        toast.error("Error setting up the request.");
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-xl shadow-md text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Hall Allocation</h2>

      {loading ? (
        <div className="text-gray-600">Loading hall allocation PDF...</div>
      ) : (
        <div>
          <button
            onClick={fetchPDF}
            className="bg-green-600 text-white px-6 py-2 rounded-md text-lg font-medium hover:bg-green-700 transition duration-200"
          >
            View Hall Allocation
          </button>

          {error && <div className="text-red-600 mt-4">{error}</div>}

          <p className="text-gray-600 mt-4">
            Click the button to open the hall allocation PDF in a new tab.
          </p>
        </div>
      )}
    </div>
  );
};

export default HallView;
