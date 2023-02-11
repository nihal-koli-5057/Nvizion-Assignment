import axios from "axios";

export const loadRolesApi = async () => await axios.get(`http://localhost:4000/role`);

export const addRoleApi = async (newRole) => await axios.post(`http://localhost:4000/role`, newRole);

export const updateRoleApi = async (updateRole) => await axios.put(`http://localhost:4000/role/${updateRole.id}`, updateRole);

export const deleteRoleApi = async (id) => await axios.delete(`http://localhost:4000/role/${id}`);

export const getSingleRoleApi = async (singlemployee) => await axios.get(`http://localhost:4000/role/${singlemployee}` );

