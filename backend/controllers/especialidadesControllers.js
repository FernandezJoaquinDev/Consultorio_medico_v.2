const Especialidad = require("../models/Especialidad");

const getEspecialidades = async (req, res) => {
  try {
    const especialidades = await Especialidad.find().populate("doctores");
    res.status(200).json(especialidades);
  } catch (error) {
    res.status(400).json({ msg: `Error en el servidor: ${error}` });
  }
};

const getEspecialidad = async (req, res) => {
  const { id } = req.params;
  try {
    const encontrado = await Especialidad.findById(id).populate("doctores");
    if (encontrado) {
      res.status(200).json(encontrado);
    } else {
      throw new Error("Especialidad no encontrada");
    }
  } catch (error) {
    res.status(400).json({ msg: `Error en el servidor: ${error}` });
  }
};

const postEspecialidad = async (req, res) => {
  const { nombre } = req.body;
  try {
    const existe = await Especialidad.findOne({ nombre });
    if (existe) {
      throw new Error("Esta especialidad ya existe");
    } else {
      const nuevo = new Especialidad({ nombre: nombre.toUpperCase() });
      await nuevo.save();
      res
        .status(200)
        .json({ msg: `Especialidad: ${nuevo.nombre} creada correctamente` });
    }
  } catch (error) {
    res.status(400).json({ msg: `Error en el servidor: ${error}` });
  }
};

const putEspecialidad = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    const encontrado = await Especialidad.findById(id);
    if (encontrado) {
      if (nombre) {
        const repetido = await Especialidad.findOne({
          nombre: nombre.toUpperCase(),
        });
        if (repetido) {
          throw new Error("Ya existe una especialidad con ese nombre");
        } else {
          encontrado.nombre = nombre.toUpperCase();
          await encontrado.save();
          res
            .status(200)
            .json({ msg: `El nombre cambio a ${nombre.toUpperCase()}` });
        }
      } else {
        encontrado.estado = true;
        await encontrado.save();
        res.status(200).json({ msg: "Especialidad dada de alta" });
      }
    } else {
      throw new Error("Especialidad no encontrada");
    }
  } catch (error) {
    res.status(400).json({ msg: `Error en el servidor: ${error}` });
  }
};

const deleteEspecialidad = async (req, res) => {
  const { id } = req.params;
  try {
    const encontrado = await Especialidad.findByIdAndUpdate(id, {
      estado: false,
    });
    if (encontrado) {
      res.status(200).json({ msg: `Especialidad dada de baja` });
    } else {
      res.status(200).json({ msg: `Especialidad no encontrada` });
    }
  } catch (error) {
    res.status(400).json({ msg: `Error en el servidor: ${error}` });
  }
};

module.exports = {
  getEspecialidades,
  getEspecialidad,
  postEspecialidad,
  putEspecialidad,
  deleteEspecialidad,
};
