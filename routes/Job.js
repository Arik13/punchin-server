const express = require("express");
const router = express.Router();

const jobsController = require("../controllers/Jobs");
router.get("/api/jobs", jobsController.getJobs);
router.post("/api/jobs", jobsController.postJob);
router.get("/api/jobs/:id", jobsController.getJob);

module.exports = router;