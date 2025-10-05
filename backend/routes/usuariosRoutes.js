const express = require("express");
const {
  getUsuarios,
  getUsuario,
  postUsuario,
  deleteUsuario,
  putUsuario,
  putUsuarioAdmin,
  putRolUsuario,
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

router.delete("/", [validarToken, ValidarAdmin, validarCampos], deleteUsuario);

router.put("/", [validarToken, ValidarAdmin, validarCampos], putUsuarioAdmin);
router.put(
  "/rol",
  [
    check("dni", "El dni no puede estar vacio").notEmpty(),
    check("nombre", "el nombre no puede estar vacio").notEmpty(),
    validarToken,
    ValidarAdmin,
    validarCampos,
  ],
  putRolUsuario
);

//router.put("/", [validarToken, ValidarAdmin, validarCampos], putUsuario);

module.exports = router;
