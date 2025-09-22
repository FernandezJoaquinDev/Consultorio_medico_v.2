const express = require("express");
const {
  getUsuarios,
  getUsuario,
  postUsuario,
  deleteUsuario,
  putUsuario,
  putUsuarioAdmin,
} = require("../controllers/usuariosControllers");
const { check } = require("express-validator");
const validarCampos = require("../middlewares/exValidator");
const validarToken = require("../middlewares/tokenValidator");
const ValidarAdmin = require("../middlewares/adminValidator");

const router = express.Router();

router.get("/", getUsuarios);

router.get(
  "/:id",
  [
    check("id", "El identificador de usuario no es valido").isMongoId(),
    validarCampos,
  ],
  getUsuario
);

router.post(
  "/",
  [
    check("email", "El email ingresado no es valido").isEmail(),
    check("dni", "El dni solo puede contener numeros").isNumeric(),
    validarCampos,
  ],
  postUsuario
);

router.delete(
  "/:id",
  [
    check("id", "El formato del identificador no es valido").isMongoId(),
    validarCampos,
  ],
  deleteUsuario
);

router.put(
  "/admin",
  [validarToken, ValidarAdmin, validarCampos],
  putUsuarioAdmin
);

router.put(
  "/:id",
  [
    check("id", "El formato del identificador no es valido").isMongoId(),
    validarCampos,
  ],
  putUsuario
);

module.exports = router;
