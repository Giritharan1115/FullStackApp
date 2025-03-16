import { useEffect, useState } from "react";
import { getEvents, createEvent, deleteEvent } from "../services/eventService";

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [eventData, setEventData] = useState({ name: "", date: "" });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const data = await getEvents();
    setEvents(data);
  };

  const handleCreateEvent = async () => {
    await createEvent(eventData);
    fetchEvents();
  };

  const handleDeleteEvent = async (id) => {
    await deleteEvent(id);
    fetchEvents();
  };

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Event Name"
          className="form-control"
          onChange={(e) => setEventData({ ...eventData, name: e.target.value })}
        />
        <input
          type="date"
          className="form-control mt-2"
          onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
        />
        <button className="btn btn-primary mt-2" onClick={handleCreateEvent}>
          Create Event
        </button>
      </div>
      <ul className="list-group mt-3">
        {events.map((event) => (
          <li
            key={event.id}
            className="list-group-item d-flex justify-content-between"
          >
            {event.name} - {event.date}
            <button
              className="btn btn-danger"
              onClick={() => handleDeleteEvent(event.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
