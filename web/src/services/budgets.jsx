import http from "./base-api";

const list = (id) => http.get(`/projects/${id}/budgets`);

const create = (id, budget) => http.post(`/projects/${id}/budget`, budget);

const detail = (id) => http.get(`/budgets/${id}`);

const update = (id, budget) => http.patch(`/projects/${id}`, budget);

const remove = (id) => http.delete(`/projects/${id}`);

export default {
  list,
  detail,
  create,
  remove,
  update,
};
