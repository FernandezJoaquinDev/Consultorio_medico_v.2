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
    const rolExistente = await Rol.findOne({ nombre });
    if (rolExistente)
      throw new Error(
        `El rol ${rolExistente.nombre} ya existe en la base de datos`
      );
    else {
      const rol = new Rol({ nombre });
      rol.save();
      res.status(200).json({ msg: `El rol ${nombre} fue creado exitosamente` });
    }
  } catch (error) {
    res.status(400).json({ msg: `Error en el servidor: ${error}` });
  }
};

const putRol = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    const encontrado = await Rol.findById(id);
    if (encontrado) {
      if (nombre) {
        const repetido = await Rol.findOne({ nombre });
        if (repetido) {
          throw new Error(`El rol ${nombre} ya existe`);
        } else {
          encontrado.nombre = nombre;
          await encontrado.save();
          res
            .status(200)
            .json({ msg: `El rol ha cambiado de nombre a ${nombre}` });
        }
      } else {
        encontrado.estado = true;
        await encontrado.save();
        res.status(200).json({ msg: "Rol dado de alta" });
      }
    } else {
      throw new Error("Rol no encontrado");
    }
  } catch (error) {
    res.status(400).json({ msg: `Error en el servidor: ${error}` });
  }
};

const deleteRol = async (req, res) => {
  const { id } = req.params;
  try {
    const encontrado = await Rol.findByIdAndUpdate(id, { estado: false });
    if (encontrado) {
      res.status(200).json({ msg: `Rol dado de baja` });
    } else {
      res.status(400).json({ msg: `Error en la ejecucion` });
    }
  } catch (error) {
    res.status(400).json({ msg: `Error en el servidor: ${error}` });
  }
};

module.exports = { getRol, getRoles, postRol, putRol, deleteRol };
