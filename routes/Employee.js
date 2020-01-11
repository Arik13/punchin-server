const express = require("express");
const router = express.Router();
const auth = require("../middleware/authenticate");
const employeesController = require("../controllers/employees");

router.get("/api/employees", [auth.authenticate, employeesController.getEmployees]);
router.put("/api/employees", [auth.authenticate, employeesController.putEmployees]);
// router.post("/api/employees", [auth.authenticate, employeesController.postEmployee]);
router.get("/api/employees/codes", [auth.authenticate, employeesController.getEmployeeCode]);
router.put("/api/employees/codes", [auth.authenticate, employeesController.putEmployeeCode]);
router.get("/api/employees/:id", [auth.authenticate, employeesController.getEmployee]);
router.get("/api/employees/:id/jobs", [auth.authenticate, employeesController.getEmployeeJobs]);

module.exports = router;