import { useEffect, useState } from "react";
import { getEvents, rsvpEvent } from "../services/eventService";

const UserDashboard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const data = await getEvents();
    setEvents(data);
  };

  const handleRSVP = async (id) => {
    await rsvpEvent(id);
    fetchEvents();
  };

  return (
    <div className="container mt-5">
      <h2>Upcoming Events</h2>
      <ul className="list-group mt-3">
        {events.map((event) => (
          <li
            key={event.id}
            className="list-group-item d-flex justify-content-between"
          >
            {event.name} - {event.date}
            <button
              className="btn btn-success"
              onClick={() => handleRSVP(event.id)}
            >
              RSVP
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDashboard;
