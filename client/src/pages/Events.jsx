import { React, useEffect, useState, useContext } from "react";
import { getEvents, deleteEvent, rsvpEvent } from "../services/eventService";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await getEvents();
      setEvents(response.data);
    };
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    if (!user || user.role !== "Admin")
      return alert("Only admins can delete events.");
    await deleteEvent(id, localStorage.getItem("token"));
    setEvents(events.filter((event) => event.id !== id));
  };

  const handleRSVP = async (id) => {
    if (!user) return alert("Please login to RSVP.");
    await rsvpEvent(id, localStorage.getItem("token"));
    alert("RSVP confirmed!");
  };

  return (
    <div className="container mt-5">
      <h2>Events</h2>
      <ul className="list-group">
        {events.map((event) => (
          <li
            key={event.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {event.name} - {event.location}
            <div>
              {user && user.role === "Admin" && (
                <>
                  <Link
                    className="btn btn-warning me-2"
                    to={`/edit-event/${event.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger me-2"
                    onClick={() => handleDelete(event.id)}
                  >
                    Delete
                  </button>
                </>
              )}
              <button
                className="btn btn-primary"
                onClick={() => handleRSVP(event.id)}
              >
                RSVP
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Events;
