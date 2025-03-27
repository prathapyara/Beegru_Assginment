import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const login = async(data) => await API.post("/users/login", data,{withCredentials: true});
export const signup = async (data) =>
  await API.post("/users/register", data, { withCredentials: true });

export const getProperties = (filters = {}) =>
  API.get(
    "/properties",
    {
      params: filters,
      withCredentials:true
    },
  );

export const createProperty = (data) =>
  API.post("/properties", data, { withCredentials: true });

export const updateProperty = (id, data) =>
  API.put(`/properties/${id}`, data, { withCredentials: true });

export const deleteProperty = (id) =>
  API.delete(`/properties/${id}`, { withCredentials: true });
