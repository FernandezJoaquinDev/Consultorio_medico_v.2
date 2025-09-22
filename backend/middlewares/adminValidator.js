const Rol = require("../models/Rol");
const Usuario = require("../models/Usuario");

const ValidarAdmin = async (req, res, next) => {
  const id = req.id;

  const encontrado = await Usuario.findById(id);
  const rolAdm = await Rol.findOne({ nombre: "ADMIN" });
  if (encontrado) {
    if (encontrado.rol.equals(rolAdm._id)) {
      next();
    } else {
      console.log(encontrado.rol);
      console.log(rolAdm.id);
      return res.status(400).json({
        msg: "Usuario no es administrador",
      });
    }
  } else {
    //console.log(encontrado);
    return res.status(400).json({
      msg: "Usuario no encontrado",
    });
  }
};

module.exports = ValidarAdmin;
