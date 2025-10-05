const express = require("express");
const {
  getRol,
  postRol,
  deleteRol,
  putRol,
  getRoles,
} = require("../controllers/rolControllers");
const { check } = require("express-validator");
const validarCampos = require("../middlewares/exValidator");
const validarToken = require("../middlewares/tokenValidator");
const validarEmpleado = require("../middlewares/empleadoValidator");
const ValidarAdmin = require("../middlewares/adminValidator");

const router = express.Router();

router.get(
  "/:id",
  [
    check("id", "El identificador no tiene un formato valido").isMongoId(),
    validarToken,
    ValidarAdmin,
    validarCampos,
  ],
  getRol
);

router.get("/", [validarToken, ValidarAdmin, validarCampos], getRoles);

router.post(
  "/",
  [
    check("nombre", "El nombre del rol no puede estar vacio").notEmpty(),
    validarToken,
    validarEmpleado,
    validarCampos,
  ],
  postRol
);

router.delete(
  "/",
  [
    check("nombre", "El nombre no puede estar vacio").notEmpty(),
    validarToken,
    ValidarAdmin,
    validarCampos,
  ],
  deleteRol
);

router.put(
  "/",
  [
    check("nombre", "El nombre no puede estar vacio").notEmpty(),
    validarToken,
    ValidarAdmin,
    validarCampos,
  ],
  putRol
);

module.exports = router;
