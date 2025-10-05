const express = require("express");
const {
  getDoctores,
  postDoctores,
  deleteDoctores,
  putDoctores,
} = require("../controllers/doctoresControllers");
const { check } = require("express-validator");
const validarCampos = require("../middlewares/exValidator");
const validarToken = require("../middlewares/tokenValidator");
const ValidarAdmin = require("../middlewares/adminValidator");
const validarEmpleado = require("../middlewares/empleadoValidator");

const router = express.Router();

router.get("/:especialidad", getDoctores);

router.post(
  "/",
  [
    check("nombre", "El nombre del doctor es necesario").notEmpty(),
    check(
      "especialidad",
      "La especialidad del medico no puede estar vacia"
    ).notEmpty(),
    validarToken,
    validarEmpleado,
    validarCampos,
  ],
  postDoctores
);

router.delete(
  "/:id",
  [
    check("id", "el formato del identificador es incorrecto").isMongoId(),
    validarToken,
    validarEmpleado,
    validarCampos,
  ],
  deleteDoctores
);

router.put(
  "/:id",
  [
    check("id", "el formato del identificador es incorrecto").isMongoId(),
    validarToken,
    ValidarAdmin,
    validarCampos,
  ],
  putDoctores
);

module.exports = router;
