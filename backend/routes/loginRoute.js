const express = require("express");
const { postLogin } = require("../controllers/loginControllers");
const { check } = require("express-validator");
const validarCampos = require("../middlewares/exValidator");

const router = express.Router();

router.post(
  "/",
  [
    check("dni", "El dni o la contraseña no son validos").isNumeric(),
    check("dni", "EL dni no puede ser nulo").notEmpty(),
    check("contraseña", "La contraseña no puede ser nula").notEmpty(),
    validarCampos,
  ],
  postLogin
);

module.exports = router;
