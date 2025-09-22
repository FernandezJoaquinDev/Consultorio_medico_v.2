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
    const existe = await Doctor.findOne({
      nombre: nombre,
      especialidad: especialidad,
    });
    if (existe) {
      throw new Error("El doctor registrado ya existe");
    } else {
      const nuevo = new Doctor({ nombre, especialidad });
      nuevo.save();
      res
        .status(200)
        .json({ msg: `El doctor ${nuevo.nombre} fue registrado con exito` });
    }
  } catch (error) {
    res.status(400).json({ msg: `Error en el servidor: ${error}` });
  }
};

const putDoctores = async (req, res) => {
  const { id } = req.params;
  const { nombre, especialidad } = req.body;
  try {
    const encontrado = await Doctor.findById(id).populate("especialidad");
    if (encontrado) {
      if (nombre) {
        encontrado.nombre = nombre;
      }
      if (especialidad) {
        encontrado.especialidad = especialidad;
      }
      if (!nombre && !especialidad) {
        encontrado.estado = true;
      }
      await encontrado.save();
      res.status(200).json({ msg: "Doctor actualizado", doctor: encontrado });
    } else {
      throw new Error("Doctor no encontrado");
    }
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
