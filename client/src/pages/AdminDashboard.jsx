import { useEffect, useState, useContext } from "react";
import { getEvents, deleteEvent } from "../services/eventService";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [rsvps, setRsvps] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user || user.role !== "Admin") return;

    const fetchData = async () => {
      try {
        const eventsResponse = await getEvents();
        const usersResponse = await axios.get(
          "http://localhost:5015/api/users",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const rsvpsResponse = await axios.get(
          "http://localhost:5015/api/rsvps/all",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setEvents(eventsResponse.data);
        setUsers(usersResponse.data);
        setRsvps(rsvpsResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [user]);

  const handleDelete = async (id) => {
    if (!user || user.role !== "Admin")
      return alert("Only admins can delete events.");
    await deleteEvent(id, localStorage.getItem("token"));
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>
      <h4>All Users</h4>
      <ul className="list-group">
        {users.map((user) => (
          <li key={user.id} className="list-group-item">
            {user.name} - {user.email} ({user.role})
          </li>
        ))}
      </ul>

      <h4 className="mt-4">All Events</h4>
      <ul className="list-group">
        {events.map((event) => (
          <li
            key={event.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {event.name} - {event.location}
            <div>
              <Link
                className="btn btn-warning me-2"
                to={`/edit-event/${event.id}`}
              >
                Edit
              </Link>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(event.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <h4 className="mt-4">RSVP Attendance</h4>
      <ul className="list-group">
        {rsvps.map((rsvp) => (
          <li key={rsvp.id} className="list-group-item">
            User ID: {rsvp.userId} - Event ID: {rsvp.eventId} - Minutes
            Attended: {rsvp.attendanceMinutes}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
