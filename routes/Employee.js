const express = require("express");
const router = express.Router();

const employeesController = require("../controllers/employees");
router.get("/api/employees", employeesController.getEmployees);
router.post("/api/employees", employeesController.postEmployee);
router.get("/api/employees/:id", employeesController.getEmployee);

module.exports = router;