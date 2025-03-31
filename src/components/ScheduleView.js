import React, { useState, useEffect } from "react";
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

export default ScheduleView;
