// const express = require("express");
// const router = express.Router();

const router = require("express").Router();

const UserAuth = require("../Controllers/authController");

//REGISTER
router.post("/register", UserAuth.getUsersRegister);

//LOGIN
router.post("/login", UserAuth.getUsersLogin);

module.exports = router;
