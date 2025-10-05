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
  const { dni } = req.body;
  try {
    const encontrado = await Usuario.findOne({ dni: dni });
    if (!encontrado) {
      return res.status(400).json({ msg: "Usuario no encontrado" });
    }
    if (encontrado.estado) {
      return res.status(400).json({ msg: "El usuario esta habilitado" });
    }
    console.log(encontrado);
    encontrado.estado = true;
    await encontrado.save();
    res.status(200).json({ msg: "Usuario dado de alta" });
  } catch (error) {
    res.status(400).json({ msg: `Error en el servidor: ${error}` });
  }
};

const deleteUsuario = async (req, res) => {
  const { dni } = req.body;
  try {
    const encontrado = await Usuario.findOne({ dni: dni });
    if (!encontrado) {
      return res.status(400).json({ msg: "Usuario no encontrado" });
    }
    if (!encontrado.estado) {
      return res.status(400).json({ msg: "El usuario ya fue dado de baja" });
    }
    encontrado.estado = false;
    await encontrado.save();
    res.status(200).json({ msg: "Usuario dado de baja" });
  } catch (error) {
    res.status(400).json({ msg: `Error en el servidor: ${error}` });
  }
};

const putUsuarioAdmin = async (req, res) => {
  const { dni } = req.body;
  try {
    const encontrado = await Usuario.findOne({ dni: dni });
    if (!encontrado) {
      return res.status(400).json({ msg: "Usuario no encontrado" });
    }
    if (encontrado.estado) {
      return res.status(400).json({ msg: "El usuario esta habilitado" });
    }
    encontrado.estado = true;
    await encontrado.save();
    res.status(200).json({ msg: "Usuario dado de alta" });
  } catch (error) {
    res.status(400).json({ msg: `Error en el servidor: ${error}` });
  }
};

const putRolUsuario = async (req, res) => {
  const { dni, nombre } = req.body;
  try {
    const usuarioFind = await Usuario.findOne({ dni: dni });
    if (!usuarioFind) {
      return res.status(400).json({ msg: `Usuario no encontrado` });
    }
    const rolFind = await Rol.findOne({ nombre: nombre.toUpperCase() });
    if (!rolFind) {
      return res.status(400).json({ msg: "Rol no encontrado" });
    }
    if (rolFind._id.equals(usuarioFind.rol)) {
      return res.status(400).json({ msg: "El usuario ya posee ese rol" });
    }
    usuarioFind.rol = rolFind._id;
    await usuarioFind.save();
    return res
      .status(200)
      .json({ msg: `${usuarioFind.nombre} ahora es ${rolFind.nombre}` });
  } catch (error) {
    res.status(400).json({ msg: `Error en el servidor: ${error}` });
  }
};

module.exports = {
  putUsuarioAdmin,
  getUsuarios,
  getUsuario,
  postUsuario,
  putUsuario,
  deleteUsuario,
  putRolUsuario,
};
