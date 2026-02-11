import axios from "axios";

const BASE_URL = "http://localhost:8082/users";

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
