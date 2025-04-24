/*import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ScheduleView = () => {
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get("/api/schedule/view", { withCredentials: true });
        setSchedule(response.data.schedule);
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching schedule.");
      }
    };
    fetchSchedule();
  }, []);

  if (loading) {
    return <div>Loading schedule...</div>;
  }

  return (
    <div>
      <h2>Exam Schedule</h2>
      <pre>{JSON.stringify(schedule, null, 2)}</pre>
    </div>
  );
};

export default ScheduleView;*/

/*import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ScheduleView = () => {
  const [loading, setLoading] = useState(false); // Track the loading state
  const [error, setError] = useState(null); // To handle any errors
  const token = localStorage.getItem('access_token');  // Assuming token is available in localStorage

  // Function to fetch the PDF when triggered
  const fetchPDF = async () => {
    if (!token) {
      toast.error("No access token found.");
      return;
    }

    setLoading(true); // Start loading state
    setError(null); // Reset error state

    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/schedule/view`, {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
              },
              responseType: "blob"
            });

      // Debugging the response from the API
      console.log("Response", response);

      const file = new Blob([response.data], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);

      // Open the PDF in a new tab
      window.open(fileURL);

      setLoading(false); // Stop loading state
    } catch (error) {
      console.error("Error:", error.response ? error.response : error);
      setError("Error loading schedule PDF.");
      toast.error("Error loading schedule PDF.");
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div>
      <h2>Exam Schedule</h2>

      {loading ? (
        <div>Loading schedule PDF...</div>
      ) : (
        <div>
          <button onClick={fetchPDF}>View Exam Schedule</button>
          {error && <div>{error}</div>}
          <p>Click the button to open the exam schedule PDF in a new tab.</p>
        </div>
      )}
    </div>
  );
};

export default ScheduleView;*/

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ScheduleView = () => {
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
      const response = await axios.get("http://127.0.0.1:5000/api/schedule/view", {
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
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Exam Schedule</h2>

      {loading ? (
        <div className="text-gray-600">Loading schedule PDF...</div>
      ) : (
        <div>
          <button
            onClick={fetchPDF}
            className="bg-green-600 text-white px-6 py-2 rounded-md text-lg font-medium hover:bg-green-700 transition duration-200"
          >
            View Exam Schedule
          </button>

          {error && <div className="text-red-600 mt-4">{error}</div>}

          <p className="text-gray-600 mt-4">
            Click the button to open the exam schedule PDF in a new tab.
          </p>
        </div>
      )}
    </div>
  );
};

export default ScheduleView;
