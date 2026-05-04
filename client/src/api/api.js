import axios from "axios";

export const createEvent = async (payload) => await axios.post(import.meta.env.VITE_APP_API + '/event', payload);

export const getEvent = async () => await axios.get(import.meta.env.VITE_APP_API + '/event');

export const deleteEvent = async (id) => await axios.delete(import.meta.env.VITE_APP_API + '/event/' + id);

export const updateEvent = async (payload) => await axios.put(import.meta.env.VITE_APP_API + '/event', payload);

export const getEmployee = async () => await axios.get(import.meta.env.VITE_APP_API + '/employee');