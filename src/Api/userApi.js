import axios from "axios";

const BASE_URL = "https://ki9hv4fa0b.execute-api.ap-south-1.amazonaws.com/";

export const createUser = (userData) => {
  return axios.post(BASE_URL, userData);
};

export const getAllUsers = () => {
  return axios.get(BASE_URL);
};

export const deleteUser = (id) => {
  return axios.delete(`${BASE_URL}/${id}`);
};

export const updateUser = (id, userData) => {
  return axios.put(`${BASE_URL}/${id}`, userData);
};
