import React, { useState, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Button from '@mui/material/Button';

const UploadFiles = () => {
  const [studentFile1, setStudentFile1] = useState(null);
  const [studentFile2, setStudentFile2] = useState(null);
  const [hallFile, setHallFile] = useState(null);
  const [commonFile, setCommonFile] = useState(null);
  const [dataProcessed, setDataProcessed] = useState(false);
  const [scheduleReady, setScheduleReady] = useState(false);
  const studentRef1 = useRef();
  const studentRef2 = useRef();
  const commonRef = useRef();
  const hallRef = useRef();
  const [maxDays, setMaxDays] = useState(1);
  const [maxSlots, setMaxSlots] = useState(1);

  const handleFileChange = (e, setFile) => {
    setFile(e.target.files[0]);
  };

  const [uploading, setUploading] = useState(false);
  const [scheduling, setScheduling] = useState(false);

  const handleFileUpload = async () => {
    setDataProcessed(false);
    setScheduleReady(false);
    setMaxDays(1);
    setMaxSlots(1);
    
     
    if (!studentFile1 || !hallFile || !commonFile) {
      toast.error("Please select NEP, Common, and Lecture Hall files.");
      return;
    }

    const formData = new FormData();
    formData.append("student_file1", studentFile1);
    formData.append("student_file2", studentFile2); // optional
    formData.append("common_file", commonFile);
    formData.append("hall_file", hallFile);

    try {
      setUploading(true);
      const response = await axios.post("http://127.0.0.1:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        setDataProcessed(true);
        toast.success(`Data processed successfully! ${response.data.courses_count} courses processed.`);
      } else {
        toast.error(response.data.message || "Error processing data.");
      }
    } catch (error) {
      console.error("Upload Error:", error);
      toast.error(error?.response?.data?.error || error.message || "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleMakeSchedule = async () => {
    setScheduleReady(false);

    if (parseInt(maxDays) < 1 || parseInt(maxSlots) < 1 || isNaN(maxDays) || isNaN(maxSlots)) {
      toast.error("Please enter valid values (≥ 1) for days and slots.");
      return;
    }
    
    const formData = new FormData();
    formData.append("max_days", parseInt(maxDays));
    formData.append("max_slots", parseInt(maxSlots));

    try {
      setScheduling(true);
      const response = await axios.post("http://127.0.0.1:5000/api/schedule", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      if (response.status === 200) {
        setScheduleReady(true);
        toast.success("Schedule generated successfully!");
      } else {
        toast.error(response.data.message || "Error generating schedule.");
      }
    } catch (error) {
      console.error("Schedule Error:", error);
      toast.error("Error generating schedule.");
    } finally {
      setScheduling(false);
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

      <div>
        <label htmlFor="studentFile1">Student-Course File -- NEP (Required):</label>
        <input id="studentFile1" ref={studentRef1} type="file" onChange={(e) => handleFileChange(e, setStudentFile1)}/>
        {studentFile1 && (<button onClick={() => {setStudentFile1(null); studentRef1.current.value = null;}}>Remove</button>)}
      </div>

      <div>
        <label htmlFor="studentFile2">Student-Course File -- CBCS (Optional):</label>
        <p style={{ fontSize: '0.85rem', color: 'gray', marginTop: '4px' }}>
          *Upload only if you have CBCS student data.
        </p>
        <input id="studentFile2" ref={studentRef2} type="file" onChange={(e) => handleFileChange(e, setStudentFile2)}/>
        {studentFile2 && (<button onClick={() => {setStudentFile2(null); studentRef2.current.value = null;}}>Remove</button>)}
      </div>

      <div>
        <label htmlFor="commonFile">Common File (Required):</label>
        <input id="commonFile" ref={commonRef} type="file" onChange={(e) => handleFileChange(e, setCommonFile)}/>
        {commonFile && (<button onClick={() => {setCommonFile(null); commonRef.current.value = null;}}>Remove</button>)}
      </div>

      <div>
        <label htmlFor="hallFile">Lecture Hall File (Required):</label>
        <input id="hallFile" ref={hallRef} type="file" onChange={(e) => handleFileChange(e, setHallFile)}/>
        {hallFile && (<button onClick={() => {setHallFile(null); hallRef.current.value = null;}}>Remove</button>)}
      </div>

      <Button onClick={handleFileUpload} disabled={uploading} style={{ marginTop: "10px" }}>
        {uploading ? "Uploading..." : "Upload Files"}
      </Button>

      {dataProcessed && (
        <div style={{ marginTop: "20px" }}>
          <h3>Data processed successfully! What would you like to do next?</h3>
          <div>
            <label>Maximum Duration (in Days):</label>
            <input type="number" value={maxDays} onChange={(e) => setMaxDays(e.target.value)} min="1"/>
          </div>
          <div>
            <label>Maximum Slots per Day:</label>
            <input type="number" value={maxSlots} onChange={(e) => setMaxSlots(e.target.value)} min="1"/>
          </div>
          <Button onClick={handleMakeSchedule} disabled={scheduling} style={{ marginTop: "10px" }}>
            {scheduling ? "Creating Schedule..." : "Generate Exam Schedule"}
          </Button>
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
