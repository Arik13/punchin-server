// User

const express = require("express");
const router = express.Router();

const usersController = require("../controllers/Users");
router.post("/api/users", usersController.postUser);
router.put("/api/users", usersController.putUser);

module.exports = router;