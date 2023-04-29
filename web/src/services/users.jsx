import { create } from "../../../api/models/user.model";
import http from "./base-api";

const create = (user) => http.post("/signup", user).then((res) => res.data);

const login = (user) => http.post("/login", user).then((res) => res.data);

const get = (id) => http.get(`/users/${id}`);

export default {
  create,
  login,
};
