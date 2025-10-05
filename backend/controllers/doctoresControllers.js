const Doctor = require("../models/Doctor");
const Especialidad = require("../models/Especialidad");

const getDoctores = async (req, res) => {
  const { especialidad } = req.params;
  try {
    const especEncontrada = await Especialidad.findOne({
      nombre: especialidad,
    });
    if (especEncontrada) {
      const doctores = await Doctor.find({
        especialidad: especEncontrada.id,
      }).populate("especialidad");
      if (doctores) {
        res.status(200).json(doctores);
      } else {
        res
          .status(400)
          .json({ msg: `No hay doctores disponibles en esta especialidad` });
      }
    } else {
      res.status(400).json({ msg: `Especialidad seleccionada inexistente` });
    }
  } catch (error) {
    res.status(400).json({ msg: `Error en el servidor: ${error}` });
  }
};

const postDoctores = async (req, res) => {
  const { nombre, especialidad } = req.body;
  try {
    const existeEsp = await Especialidad.findOne({
      nombre: especialidad.toUpperCase(),
    });
    if (!existeEsp) {
      return res.status(400).json({ msg: `Especialidad no encontrada` });
    }
    const existe = await Doctor.findOne({
      nombre: nombre,
      especialidad: existeEsp._id,
    });
    if (existe) {
      return res.status(400).json({ msg: `El doctor ingresado ya existe` });
    }
    const nuevo = new Doctor({ nombre, especialidad: existeEsp._id });
    nuevo.save();
    res
      .status(200)
      .json({ msg: `El doctor ${nuevo.nombre} fue registrado con exito` });
  } catch (error) {
    res.status(400).json({ msg: `Error en el servidor: ${error}` });
  }
};

const putDoctores = async (req, res) => {
  const { id } = req.params;
  try {
    const encontrado = await Doctor.findById(id);
    if (!encontrado) {
      return res.status(400).json({ msg: `Usuario no encontrado` });
    }
    encontrado.estado = !encontrado.estado;
    await encontrado.save();
    res.status(200).json({ msg: `Estado modificado` });
  } catch (error) {
    res.status(400).json({ msg: `Error en el servidor: ${error}` });
  }
};

const deleteDoctores = async (req, res) => {
  const { id } = req.params;
  try {
    const encontrado = Doctor.findByIdAndUpdate(id, { estado: false });
    if (encontrado) {
      res.status(200).json({ msg: "Doctor dado de baja" });
    } else {
      res.status(400).json({ msg: "Doctor no encontrado" });
    }
  } catch (error) {
    res.status(400).json({ msg: `Error en el servidor: ${error}` });
  }
};

module.exports = { getDoctores, postDoctores, putDoctores, deleteDoctores };
