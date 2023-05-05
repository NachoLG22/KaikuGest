import http from "./base-api";

const create = (user) => http.post("/signup", user);

const login = (user) => http.post("/login", user);

const list = (query) => http.get("/users", { params: query });

const profile = () => http.get("/profile");

// const detail = (id) => http.get(`/users/${id}`);

const logout = () => http.post("/logout");



export default {
  create,
  login,
  list,
  // detail,
  profile,
  logout,
}
