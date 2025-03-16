import axios from "axios";

const API_URL = "http://localhost:5015/api/events";

export const getEvents = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createEvent = async (eventData) => {
  await axios.post(API_URL, eventData);
};

export const deleteEvent = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const rsvpEvent = async (id) => {
  await axios.post(`${API_URL}/${id}/rsvp`);
};
