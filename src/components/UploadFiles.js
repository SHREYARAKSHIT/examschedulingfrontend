import React, { useState, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Button from '@mui/material/Button';
import logoutUser from "./logout";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const UploadFiles = () => {
  const token = localStorage.getItem('access_token');
  const navigate = useNavigate();

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
      alert("Please select NEP, Common, and Lecture Hall files.");
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
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });

      if (response.status === 200) {
        setDataProcessed(true);
        alert(`Data processed successfully! ${response.data.courses_count} courses processed.`);
      } else {
        console.error(response.data.message || "Error processing data.");
        alert('Error processing data!')
      }
    } catch (error) {
      console.error("Upload Error:", error);
      alert(error?.response?.data?.error || error.message || "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleMakeSchedule = async () => {
    setScheduleReady(false);

    if (parseInt(maxDays) < 1 || parseInt(maxSlots) < 1 || isNaN(maxDays) || isNaN(maxSlots)) {
      alert("Please enter valid values (≥ 1) for days and slots.");
      return;
    }
    
    const formData = new FormData();
    formData.append("max_days", parseInt(maxDays));
    formData.append("max_slots", parseInt(maxSlots));

    try {
      setScheduling(true);
      const response = await axios.post("http://127.0.0.1:5000/api/schedule", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 200) {
        setScheduleReady(true);
        alert("Schedule generated successfully!");
      } else {
        console.error(response.data.message || "Error generating schedule.");
        alert('Error Generating Schedule !')
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
    } catch (error) {
      console.error("Download Error:", error);
      alert("Error downloading schedule.");
    }
  };

  /*return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <div style={{ padding: "20px", textAlign: "center" }}>
        <Link to="/dashboard" style={{ marginRight: "20px" }}>
          Go to Dashboard
        </Link>
        {/*
        <button onClick={() => logoutUser(navigate)} style={{ cursor: 'pointer', marginTop: '10px' }}>
          Logout
        </button>}
      </div>
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

export default UploadFiles;*/

return (
  <div className="max-w-4xl mx-auto p-6">
    <div className="flex justify-between mb-6">
      <Link to="/dashboard" className="text-blue-600 hover:underline">← Back to Dashboard</Link>
      {/* <button onClick={() => logoutUser(navigate)} className="text-red-500 hover:underline">Logout</button> */}
    </div>

    <h2 className="text-2xl font-semibold text-center mb-6">Upload Exam Data</h2>

    <div className="space-y-6">
      <div>
        <label className="block font-medium">Student-Course File — NEP (Required):</label>
        <input type="file" ref={studentRef1} onChange={(e) => handleFileChange(e, setStudentFile1)} className="mt-1" />
        {studentFile1 && <button className="ml-2 text-sm text-red-500" onClick={() => { setStudentFile1(null); studentRef1.current.value = null; }}>Remove</button>}
      </div>

      <div>
        <label className="block font-medium">Student-Course File — CBCS (Optional):</label>
        <p className="text-sm text-gray-500">*Upload only if you have CBCS student data.</p>
        <input type="file" ref={studentRef2} onChange={(e) => handleFileChange(e, setStudentFile2)} className="mt-1" />
        {studentFile2 && <button className="ml-2 text-sm text-red-500" onClick={() => { setStudentFile2(null); studentRef2.current.value = null; }}>Remove</button>}
      </div>

      <div>
        <label className="block font-medium">Common File (Required):</label>
        <input type="file" ref={commonRef} onChange={(e) => handleFileChange(e, setCommonFile)} className="mt-1" />
        {commonFile && <button className="ml-2 text-sm text-red-500" onClick={() => { setCommonFile(null); commonRef.current.value = null; }}>Remove</button>}
      </div>

      <div>
        <label className="block font-medium">Lecture Hall File (Required):</label>
        <input type="file" ref={hallRef} onChange={(e) => handleFileChange(e, setHallFile)} className="mt-1" />
        {hallFile && <button className="ml-2 text-sm text-red-500" onClick={() => { setHallFile(null); hallRef.current.value = null; }}>Remove</button>}
      </div>

      <Button onClick={handleFileUpload} disabled={uploading} variant="contained" color="primary">
        {uploading ? "Uploading..." : "Upload Files"}
      </Button>
    </div>

    {dataProcessed && (
      <div className="mt-10 space-y-4">
        <h3 className="text-lg font-semibold text-green-600">Data processed successfully!</h3>

        <div>
          <label className="block">Maximum Duration (in Days):</label>
          <input type="number" value={maxDays} onChange={(e) => setMaxDays(e.target.value)} className="border rounded p-1 w-20" />
        </div>

        <div>
          <label className="block">Maximum Slots per Day:</label>
          <input type="number" value={maxSlots} onChange={(e) => setMaxSlots(e.target.value)} className="border rounded p-1 w-20" />
        </div>

        <Button onClick={handleMakeSchedule} disabled={scheduling} variant="contained" color="secondary">
          {scheduling ? "Creating Schedule..." : "Generate Exam Schedule"}
        </Button>
      </div>
    )}

    {scheduleReady && (
      <div className="mt-10 space-y-4 text-center">
        <h3 className="text-lg font-semibold text-green-600">Schedule is ready!</h3>
        <div className="space-x-4">
          <Button variant="outlined" onClick={() => handleDownloadSchedule("csv", "schedule")}>Download CSV</Button>
          <Button variant="outlined" onClick={() => handleDownloadSchedule("pdf", "schedule")}>Download PDF</Button>
        </div>

        <h3 className="mt-6 text-lg font-semibold text-green-600">Hall Accommodation is ready!</h3>
        <div className="space-x-4">
          <Button variant="outlined" onClick={() => handleDownloadSchedule("csv", "hall_accommodation")}>Download CSV</Button>
          <Button variant="outlined" onClick={() => handleDownloadSchedule("pdf", "hall_accommodation")}>Download PDF</Button>
        </div>
      </div>
    )}
  </div>
);
};

export default UploadFiles;
