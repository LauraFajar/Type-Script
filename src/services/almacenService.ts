import axios from "axios";

const API = "http://localhost:3000/api/almacenes";

export const getAlmacenes = () => axios.get(`${API}/listar`);
export const getAlmacenById = (id: number) => axios.get(`${API}/buscar/${id}`);
export const createAlmacen = (data: any) => axios.post(`${API}/crear`, data);
export const updateAlmacen = (id: number, data: any) => axios.put(`${API}/actualizar/${id}`, data);
export const deleteAlmacen = (id: number) => axios.delete(`${API}/eliminar/${id}`);