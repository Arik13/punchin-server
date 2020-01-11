const express = require("express");
const router = express.Router();
const auth = require("../middleware/authenticate");

const jobsController = require("../controllers/Jobs");
router.get("/api/jobs", [auth.authenticate, jobsController.getJobs]);
router.post("/api/jobs", [auth.authenticate, jobsController.postJob]);
router.get("/api/jobs/:id", [auth.authenticate, jobsController.getJob]);
router.get("/api/jobs/:id/employees", [auth.authenticate, jobsController.getJobEmployees]);

module.exports = router;