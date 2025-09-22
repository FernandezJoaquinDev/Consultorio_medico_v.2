const Usuario = require("../models/Usuario");
const Rol = require("../models/Rol");
const bcrypt = require("bcrypt");

const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().populate("rol");
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(400).json({ msg: `Error en el servidor: ${error}` });
  }
};

const getUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findById(id).populate("rol", "nombre");
    res.status(200).json(usuario);
  } catch (error) {
    res.status(400).json({ msg: `Error en el servidor: ${error}` });
  }
};

const postUsuario = async (req, res) => {
  const { nombre, dni, email, contraseña } = req.body;
  try {
    const dniExis = await Usuario.findOne({ dni });
    const emailExis = await Usuario.findOne({ email });
    if (dniExis || emailExis) {
      throw new Error("El dni o email ya pertenecen a un usuario");
    } else {
      const rol = await Rol.findOne({ nombre: "USER" });
      const nuevo = new Usuario({ nombre, dni, email, contraseña });
      nuevo.rol = rol._id;
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(nuevo.contraseña, salt);
      nuevo.contraseña = hash;
      await nuevo.save();
      res.status(200).json({
        msg: `El usuario ${nuevo.nombre} fue creado correctamente`,
      });
    }
  } catch (error) {
    res.status(400).json({ msg: `Error en el servidor: ${error}` });
  }
};

const putUsuario = async (req, res) => {
  const { id } = req.params;
  const { email, contraseña, contraseñaActual } = req.body;
  try {
    const encontrado = await Usuario.findById(id);
    if (encontrado) {
      if (email) {
        encontrado.email = email;
      }
      if (contraseña) {
        const evaluar = bcrypt.compareSync(contraseña, encontrado.contraseña);

        if (evaluar) {
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(contraseñaActual, salt);
          encontrado.contraseña = hash;
        } else {
          throw new Error("Contraseña incorrecta");
        }
      }
      await encontrado.save();
      res.status(200).json({ msg: "Usuario modificado" });
    } else {
      throw new Error("Usuario no encontrado");
    }
  } catch (error) {
    res.status(400).json({ msg: `Error en el servidor: ${error}` });
  }
};

const deleteUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const encontrado = await Usuario.findByIdAndUpdate(id, { estado: false });
    if (encontrado) {
      res.status(200).json({ msg: "Usuario dado de baja" });
    }
  } catch (error) {
    res.status(400).json({ msg: `Error en el servidor: ${error}` });
  }
};

const putUsuarioAdmin = async (req, res) => {
  const { rol, estado, dni } = req.body;
  const usuario = await Usuario.findOne({ dni: dni });
  if (usuario) {
    if (rol) {
      const rolEncontrado = await Rol.findOne({ nombre: rol.toUpperCase() });
      if (rolEncontrado) {
        usuario.rol = rolEncontrado._id;
      } else {
        res.status(400).json({ msg: "El rol ingresado no fue encontrado" });
      }
    }
    if (estado) {
      usuario.estado = estado;
    }
    await usuario.save();
    res.status(200).json({ msg: "Usuario modificado exitosamente" });
  } else {
    res.status(400).json({ msg: "Usuario no encontrado" });
  }
};

module.exports = {
  putUsuarioAdmin,
  getUsuarios,
  getUsuario,
  postUsuario,
  putUsuario,
  deleteUsuario,
};
