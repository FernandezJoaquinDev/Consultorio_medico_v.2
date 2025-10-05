const Rol = require("../models/Rol");

const getRol = async (req, res) => {
  const { id } = req.params;
  try {
    const rolEncontrado = await Rol.findById(id).populate("usuarios", "nombre");
    if (rolEncontrado) {
      res.status(200).json(rolEncontrado);
    } else {
      res
        .status(400)
        .json({ msg: `No se encontro un rol con ese identificador` });
    }
  } catch (error) {
    res.status(400).json({ msg: `Error en el servidor: ${error}` });
  }
};

const getRoles = async (req, res) => {
  try {
    const roles = await Rol.find().populate("usuarios", "nombre");
    res.status(200).json(roles);
  } catch (error) {
    res.status(400).json({ msg: `Error en el servidor: ${error}` });
  }
};

const postRol = async (req, res) => {
  const { nombre } = req.body;

  try {
    const rolExistente = await Rol.findOne({ nombre: nombre.toUpperCase() });
    if (rolExistente) {
      return res.status(400).json({
        msg: `El rol: ${rolExistente.nombre} ya existe en la base de datos`,
      });
    }
    const rol = new Rol({ nombre: nombre.toUpperCase() });
    await rol.save();
    res
      .status(200)
      .json({ msg: `El rol ${rol.nombre} fue creado exitosamente` });
  } catch (error) {
    res.status(400).json({ msg: `Error en el servidor: ${error}` });
  }
};

const putRol = async (req, res) => {
  const { nombre } = req.body;
  try {
    const encontrado = await Rol.findOne({ nombre: nombre.toUpperCase() });
    if (!encontrado) {
      return res.status(400).json({ msg: `Rol no encontrado` });
    }
    if (encontrado.estado) {
      return res.status(400).json({ msg: `El rol ya estaba habilitado` });
    }
    encontrado.estado = true;
    await encontrado.save();
    res
      .status(200)
      .json({ msg: `El rol: ${encontrado.nombre} fue dado de alta` });
  } catch (error) {
    res.status(400).json({ msg: `Error en el servidor: ${error}` });
  }
};

const deleteRol = async (req, res) => {
  const { nombre } = req.body;
  try {
    const encontrado = await Rol.findOne({ nombre: nombre.toUpperCase() });
    if (!encontrado) {
      return res.status(400).json({ msg: `Rol no encontrado` });
    }
    if (!encontrado.estado) {
      return res.status(400).json({ msg: `El rol ya estaba deshabilitado` });
    }
    encontrado.estado = false;
    await encontrado.save();
    res
      .status(200)
      .json({ msg: `El rol ${encontrado.nombre} fue dado de baja` });
  } catch (error) {
    res.status(400).json({ msg: `Error en el servidor: ${error}` });
  }
};

module.exports = { getRol, getRoles, postRol, putRol, deleteRol };
