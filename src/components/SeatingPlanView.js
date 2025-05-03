import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const SeatingPlanView = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('access_token');
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [downloadingCsv, setDownloadingCsv] = useState(false);

  const fetchPDF = async () => {
    if (!token) {
      toast.error("No access token found.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("http://127.0.0.1:5000/api/seatingplan/view", {
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

  const handleDownloadSchedule = async (fileType, fileName) => {
    if (fileType === "pdf") {
      setDownloadingPdf(true);
    } else if (fileType === "csv") {
      setDownloadingCsv(true);
    }
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/schedule/download/${fileType}/${fileName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        responseType: "blob"
      });
  
      const link = document.createElement("a");
      const fileURL = URL.createObjectURL(response.data);
      link.href = fileURL;
      link.download = `${fileName}.${fileType === "csv" ? "csv" : "pdf"}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      if (fileType === "pdf") {
        setDownloadingPdf(false);
      } else if (fileType === "csv"){
        setDownloadingCsv(false);
      }
    } catch (error) {
      console.error("Download Error:", error);
      alert("Error downloading schedule.");
      if (fileType === "pdf") {
        setDownloadingPdf(false);
      } else if (fileType === "csv"){
        setDownloadingCsv(false);
      }
    }
  };


return (
  <div className="max-w-2xl mx-auto mt-12 p-6 bg-white rounded-lg shadow-md border border-gray-200">
    <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-6">
      <FontAwesomeIcon icon={faBuilding} className="mr-3 text-indigo-600" />
        Seating Plan
    </h2>

    <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mb-6">
      <button
        onClick={fetchPDF}
        className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium transition duration-200"
        disabled={loading}
      >
        {loading ? "Opening PDF..." : "View as PDF"}
      </button>

      <button
        onClick={() => handleDownloadSchedule("pdf", "seating_plan")}
        className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2 rounded-lg font-medium transition duration-200"
      >
        Download PDF
      </button>

      <button
        onClick={() => handleDownloadSchedule("csv", "seating_plan")}
        className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-2 rounded-lg font-medium transition duration-200"
      >
        Download CSV
      </button>
    </div>

    <p className="text-gray-600 text-sm text-center">
      Click "View as PDF" to open the seating plan in a new tab. If it doesn’t open, please check popup settings.
    </p>
  </div>
);
};

export default SeatingPlanView;