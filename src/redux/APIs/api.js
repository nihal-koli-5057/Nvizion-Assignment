import axios from "axios";

export const loadUsersApi = async () => await axios.get(`http://localhost:4000/posts`);

export const addEmployeeApi = async (newEmployee) => await axios.post(`http://localhost:4000/posts`, newEmployee);

export const updateEmployeeApi = async (updateEmployee) => await axios.put(`http://localhost:4000/posts/${updateEmployee.id}`, updateEmployee);

export const deleteEmployeeApi = async (id) => await axios.delete(`http://localhost:4000/posts/${id}`);

export const getSingleEmployeeApi = async (singlemployee) => await axios.get(`http://localhost:4000/posts/${singlemployee}` );

