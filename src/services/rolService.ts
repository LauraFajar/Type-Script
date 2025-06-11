import axios from "axios";

const API = "http://localhost:3000/api/roles";

export const getRoles = () => axios.get(`${API}/listar`);
export const getRolById = (id: number) => axios.get(`${API}/buscar/${id}`);
export const createRol = (data: any) => axios.post(`${API}/crear`, data);
export const updateRol = (id: number, data: any) => axios.put(`${API}/actualizar/${id}`, data);
export const deleteRol = (id: number) => axios.delete(`${API}/eliminar/${id}`);
