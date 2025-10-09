const { Router } = require("express");
const {
  getTurnos,
  postTurnos,
  putTurnos,
} = require("../controllers/turnosControllers");
const validarToken = require("../middlewares/tokenValidator");
const validarCampos = require("../middlewares/exValidator");
const { check } = require("express-validator");
const validarEmpleado = require("../middlewares/empleadoValidator");
const router = Router();

router.get("/", [validarToken, validarCampos], getTurnos);

router.post(
  "/",
  [
    check(
      "doctor",
      "el formato del identificador de doctor es incorrecto"
    ).isMongoId(),
    validarToken,
    validarCampos,
  ],
  postTurnos
);

router.put("/:id", [validarToken, validarEmpleado, validarCampos], putTurnos);

module.exports = router;
