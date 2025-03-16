import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { editEvent, getEvents } from "../services/eventService";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    name: "",
    location: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    const fetchEvent = async () => {
      const response = await getEvents();
      const event = response.data.find((e) => e.id.toString() === id);
      if (event) {
        setEventData({
          name: event.name,
          location: event.location,
          date: event.date.split("T")[0],
          startTime: event.startTime,
          endTime: event.endTime,
        });
      }
    };
    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await editEvent(id, eventData, localStorage.getItem("token"));
    alert("Event updated successfully!");
    navigate("/events");
  };

  return (
    <div className="container mt-5">
      <h2>Edit Event</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          className="form-control mb-2"
          value={eventData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          className="form-control mb-2"
          value={eventData.location}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          className="form-control mb-2"
          value={eventData.date}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="startTime"
          className="form-control mb-2"
          value={eventData.startTime}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="endTime"
          className="form-control mb-2"
          value={eventData.endTime}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-success">
          Update Event
        </button>
      </form>
    </div>
  );
};

export default EditEvent;
