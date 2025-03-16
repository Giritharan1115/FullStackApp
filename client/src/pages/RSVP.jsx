import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const RSVP = () => {
  const [rsvps, setRsvps] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchRSVPs = async () => {
      if (!user) return;
      const url =
        user.role === "Admin"
          ? "http://localhost:5015/api/rsvps/all"
          : "http://localhost:5015/api/rsvps/myAttendance";
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setRsvps(response.data);
    };
    fetchRSVPs();
  }, [user]);

  return (
    <div className="container mt-5">
      <h2>RSVP Attendance</h2>
      <ul className="list-group">
        {rsvps.map((rsvp) => (
          <li key={rsvp.id} className="list-group-item">
            Event ID: {rsvp.eventId} - Attendance: {rsvp.attendanceMinutes} min
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RSVP;
