const express = require("express");
const {
  getEspecialidad,
  getEspecialidades,
  postEspecialidad,
  deleteEspecialidad,
  putEspecialidad,
} = require("../controllers/especialidadesControllers");
const { check } = require("express-validator");
const validarCampos = require("../middlewares/exValidator");
const ValidarAdmin = require("../middlewares/adminValidator");
const validarToken = require("../middlewares/tokenValidator");
const validarEmpleado = require("../middlewares/empleadoValidator");

const router = express.Router();

router.get("/", getEspecialidades);

router.get(
  "/:id",
  [
    check("id", "El identificador no tiene un formato valido").isMongoId(),
    validarCampos,
  ],
  getEspecialidad
);

router.post(
  "/",
  [
    check(
      "nombre",
      "El nombre de la especialidad no puede estar vacio"
    ).notEmpty(),
    validarToken,
    ValidarAdmin,
    validarCampos,
  ],
  postEspecialidad
);

router.delete(
  "/:id",
  [
    check("id", "El identificador no tiene un formato valido").isMongoId(),
    validarToken,
    validarEmpleado,
    validarCampos,
  ],
  deleteEspecialidad
);

router.put(
  "/:id",
  [
    check("id", "El identificador no tiene un formato valido").isMongoId(),
    validarToken,
    validarEmpleado,
    validarCampos,
  ],
  putEspecialidad
);

module.exports = router;
