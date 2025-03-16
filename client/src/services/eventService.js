import axios from "axios";

const API_URL = "http://localhost:5015/api/events";

export const getEvents = async () => {
  return axios.get(API_URL);
};

export const createEvent = async (eventData, token) => {
  return axios.post(API_URL, eventData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const editEvent = async (id, updatedData, token) => {
  return axios.put(`${API_URL}/${id}`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteEvent = async (id, token) => {
  return axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const rsvpEvent = async (eventId, token) => {
  return axios.post(
    `http://localhost:5015/api/rsvps`,
    { eventId },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
