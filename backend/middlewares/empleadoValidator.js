const Usuario = require("../models/Usuario");
const Rol = require("../models/Rol");

const validarEmpleado = async (req, res, next) => {
  const id = req.id;
  const empleado = await Usuario.findById(id);
  const rolEmp = await Rol.findOne({ nombre: "EMP" });
  const rolAdmin = await Rol.findOne({ nombre: "ADMIN" });
  if (empleado.rol.equals(rolEmp._id) || empleado.rol.equals(rolAdmin._id)) {
    next();
  } else {
    return res.status(401).json({ msg: "Error de autenticacion de roles" });
  }
};

module.exports = validarEmpleado;
