const express = require("express");
const router = express();
const { validateRegister } = require("../validators/validatorRegister");
const { validateCreate } = require("../validators/authValidator");
const { login } = require("../controllers/authControllers");
const { findMe, createUser} = require("../controllers/users.controllers");
const { authenticatedUser, optionsFileUpload } = require("../middlewares");


router.post("/login", validateCreate, login);

router.post("/register", optionsFileUpload ,validateRegister, createUser);

router.get("/me", authenticatedUser, findMe);

module.exports = router;
