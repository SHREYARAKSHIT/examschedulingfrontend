import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const UploadFiles = () => {
  const [studentFile1, setStudentFile1] = useState(null);
  const [studentFile2, setStudentFile2] = useState(null);
  const [dataProcessed, setDataProcessed] = useState(false);
  const [scheduleReady, setScheduleReady] = useState(false);

  const handleFileChange = (e, setFile) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!studentFile1 || !studentFile2) {
      toast.error("Please select both student files.");
      return;
    }

    const formData = new FormData();
    formData.append("student_file1", studentFile1);
    formData.append("student_file2", studentFile2);

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if(response.status === 200){
        setDataProcessed(true);
        toast.success("Data processed successfully!");
      } else {
        toast.error(response.data.message || "Error processing data.");
      }
    } catch (error) {
      console.error("Upload Error:", error);
      toast.error(error.response?.data?.error || "Error uploading files.");
    }
  };

  const handleMakeSchedule = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/schedule");
  
      if (response.status === 200) {
        setScheduleReady(true);
        toast.success("Schedule generated successfully!");
      } else {
        toast.error(response.data.message || "Error generating schedule.");
      }
    } catch (error) {
      console.error("Schedule Error:", error);
      toast.error("Error generating schedule.");
    }
  };  
  

  const handleDownloadSchedule = async (fileType, fileName) => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/schedule/download/${fileType}/${fileName}`, {
        responseType: "blob",
      });
  
      const link = document.createElement("a");
      const fileURL = URL.createObjectURL(response.data);
      link.href = fileURL;
      link.download = `${fileName}.${fileType === "csv" ? "csv" : "pdf"}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download Error:", error);
      toast.error("Error downloading schedule.");
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Upload Exam Data</h2>
      <input type="file" onChange={(e) => handleFileChange(e, setStudentFile1)} />
      <input type="file" onChange={(e) => handleFileChange(e, setStudentFile2)} />
      <button onClick={handleFileUpload} style={{ marginTop: "10px" }}>Upload Files</button>

      {dataProcessed && (
        <div style={{ marginTop: "20px" }}>
          <h3>Data processed successfully! What would you like to do next?</h3>
          <button onClick={handleMakeSchedule} style={{ marginTop: "10px" }}>Generate Exam Schedule</button>
        </div>
      )}

      {scheduleReady && (
        <div style={{ marginTop: "20px" }}>
          <h3>Schedule is ready!</h3>
          <button onClick={() => handleDownloadSchedule("csv", "schedule")}>Download Schedule (CSV)</button>
          <button onClick={() => handleDownloadSchedule("pdf", "schedule")}>Download Schedule (PDF)</button>
          <h3>Hall Accommodation is ready!</h3>
          <button onClick={() => handleDownloadSchedule("csv", "hall_accommodation")}>Download Hall Accommodation (CSV)</button>
          <button onClick={() => handleDownloadSchedule("pdf", "hall_accommodation")}>Download Hall Accommodation (PDF)</button>
        </div>
      )}
    </div>
  );
};

export default UploadFiles;
