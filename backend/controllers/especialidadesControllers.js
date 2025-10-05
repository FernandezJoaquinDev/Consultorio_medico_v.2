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
    const existe = await Especialidad.findOne({ nombre: nombre.toUpperCase() });
    if (existe) {
      return res.status(400).json({ msg: "Ya existe esta especialidad" });
    }
    const nuevo = new Especialidad({ nombre: nombre.toUpperCase() });
    await nuevo.save();
    res
      .status(200)
      .json({ msg: `Especialidad: ${nuevo.nombre} creada correctamente` });
  } catch (error) {
    res.status(400).json({ msg: `Error en el servidor: ${error}` });
  }
};

const putEspecialidad = async (req, res) => {
  const { nombre } = req.body;
  try {
    const encontrado = await Especialidad.findOne({
      nombre: nombre.toUpperCase(),
    });
    if (!encontrado) {
      return res.status(400).json({ msg: `Especialidad no encontrada` });
    }
    if (encontrado.estado) {
      return res
        .status(400)
        .json({ msg: `Esta especialidad ya estaba habilitada` });
    }
    encontrado.estado = true;
    await encontrado.save();
    res.status(200).json({ msg: `Especialidad dada de alta` });
  } catch (error) {
    res.status(400).json({ msg: `Error en el servidor: ${error}` });
  }
};

const deleteEspecialidad = async (req, res) => {
  const { nombre } = req.body;
  try {
    const encontrado = await Especialidad.findOne({
      nombre: nombre.toUpperCase(),
    });
    if (!encontrado) {
      return res.status(400).json({ msg: `Especialidad no encontrada` });
    }
    if (!encontrado.estado) {
      return res
        .status(400)
        .json({ msg: `Esta especialidad ya estaba deshabilitada` });
    }
    encontrado.estado = false;
    await encontrado.save();
    res.status(200).json({ msg: `Especialidad dada de baja` });
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
