const express = require("express");
const { getUsers, addUser } = require("../Controller/UserController");
const router = express.Router();

// router.get("/", getUsers);
router.post("/userAdd", addUser);

module.exports = router;
