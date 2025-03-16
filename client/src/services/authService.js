import axios from "axios";

const API_URL = "http://localhost:5015/api/auth";

export const registerUser = async (userData) => {
  console.log("Register Request:", userData);
  return axios.post(`${API_URL}/register`, userData, {
    headers: { "Content-Type": "application/json" },
  });
};

export const loginUser = async (userData) => {
  console.log("Login Request:", userData);
  return axios.post(`${API_URL}/login`, userData, {
    headers: { "Content-Type": "application/json" },
  });
};
