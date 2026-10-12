import { request } from "./api.js";
export const salonesApi = {
  listar: () => request("/salones/"),
  obtener: (id) => request(`/salones/${id}`),
  crear: (data) => request("/salones/", { method: "POST", body: JSON.stringify(data) }),
  actualizar: (id, data) => request(`/salones/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  eliminar: (id) => request(`/salones/${id}`, { method: "DELETE" }),
  tiposEvento: () => request("/tipos-evento/"),
};