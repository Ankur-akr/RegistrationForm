import axios from "axios";

const BASE_URL = "http://registrationformbackend-env.eba-yvhrwe9z.ap-south-1.elasticbeanstalk.com/users";

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
