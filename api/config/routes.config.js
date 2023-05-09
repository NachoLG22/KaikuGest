const express = require("express");
const router = express.Router();
const projects = require("../controllers/projects.controller");
const users = require("../controllers/user.controller");
const budgets = require("../controllers/budgets.controllers");
const invoices = require("../controllers/invoices.controller");
const projectsMid = require("../middlewares/projects.mid");
const secureMid = require("../middlewares/secure.mid");
const budgetsMid = require("../middlewares/budget.mid");
const invoicesMid = require("../middlewares/invoices.mid");
const usersMid = require("../middlewares/users.mind");
const multer = require("../config/multer.config");

//**Projects */
router.get("/projects", secureMid.isAuthenticated, projects.list);
router.post("/projects", secureMid.isAuthenticated, projects.create);
router.get(
  "/projects/:id",
  secureMid.isAuthenticated,
  projectsMid.exists,
  projects.detail
);
router.delete(
  "/projects/:id",
  secureMid.isAuthenticated,
  projectsMid.exists,
  projects.delete
);
router.patch(
  "/projects/:id",
  secureMid.isAuthenticated,
  projectsMid.exists,
  projects.update
);

//**Users */
router.get("/users", users.list);
// router.get("/users/:id", usersMid.exists, users.detailById);
router.post("/signup", users.create);
router.post("/login", users.login);
router.post("/logout", users.logout);
router.get(
  "/profile",
  secureMid.isAuthenticated,

  users.detail
);
router.delete("/profile", secureMid.isAuthenticated, users.delete);
router.patch("/profile", secureMid.isAuthenticated, users.update);

//**Budgets */

router.get("/projects/:id/budgets", secureMid.isAuthenticated, budgets.list);
router.post(
  "/projects/:id/budget",
  secureMid.isAuthenticated,
  projectsMid.exists,
  budgets.create
);
router.get(
  "/budgets/:id",
  secureMid.isAuthenticated,
  budgetsMid.exists,
  budgets.detail
);
router.delete(
  "/budgets/:id",
  secureMid.isAuthenticated,
  budgetsMid.exists,
  budgets.delete
);
router.patch(
  "/budgets/:id",
  secureMid.isAuthenticated,
  budgetsMid.exists,
  budgets.update
);

//**Invoices */
router.post(
  "/budgets/:id/invoices",
  secureMid.isAuthenticated,
  budgetsMid.exists,
  invoices.create
);
router.get("/budgets/:id/invoices", secureMid.isAuthenticated, invoices.list);
router.get(
  "/invoices/:id",
  secureMid.isAuthenticated,
  invoicesMid.exists,
  invoices.detail
);
router.delete(
  "/invoices/:id",
  secureMid.isAuthenticated,
  invoicesMid.exists,
  invoices.delete
);
router.patch(
  "/invoices/:id",
  secureMid.isAuthenticated,
  invoicesMid.exists,
  invoices.update
);

//**Invoices */
router.post("/budgets/:id/costs", secureMid.isAuthenticated, invoices.create);
router.get("/budgets/:id/costs", secureMid.isAuthenticated, invoices.list);
router.get(
  "/costs/:id",
  secureMid.isAuthenticated,
  invoicesMid.exists,
  invoices.detail
);
router.delete(
  "/costs/:id",
  secureMid.isAuthenticated,
  invoicesMid.exists,
  invoices.delete
);
router.patch(
  "/costs/:id",
  secureMid.isAuthenticated,
  invoicesMid.exists,
  invoices.update
);

module.exports = router;
