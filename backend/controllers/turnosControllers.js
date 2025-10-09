const Turno = require("../models/Turno");
const dayjs = require("dayjs");
const getTurnos = async (req, res) => {
  const id = req.id;
  try {
    const turnos = await Turno.find({ paciente: id, estado: true })
      .populate("paciente", "nombre")
      .populate("doctor", "nombre");
    if (!turnos) {
      return res.status(400).json({ msg: "Usted no tiene turnos programados" });
    }
    res.status(200).json(turnos);
  } catch (error) {
    res.status(400).json({ msg: "Error del sistema", error });
  }
};

const postTurnos = async (req, res) => {
  const { fecha, doctor } = req.body;
  const id = req.id;
  try {
    const fechaFormato = dayjs(fecha, "DD/MM/YYYY HH:mm").toDate();
    const turno = new Turno({
      fecha: fechaFormato,
      doctor: doctor,
      paciente: id,
    });
    if (!turno) {
      return res.status(400).json({ msg: "Error al generar turno" });
    }
    await turno.save();
    res.status(200).json({ msg: "Turno emitido" });
  } catch (error) {
    res.status(400).json({ msg: "Error del sistema", error });
  }
};

const putTurnos = async (req, res) => {
  const { id } = req.params;
  try {
    const turno = await Turno.findById(id);
    if (!turno) {
      return res.status(400).json({ msg: "Error al dar de baja el turno" });
    }
    if (turno && !turno.estado) {
      return res.status(400).json({ msg: "El turno esta dado de baja" });
    }
    turno.estado = true;
    res.status(200).json({ msg: "Turno dado de baja" });
  } catch (error) {
    res.status(400).json({ msg: "Error del sistema", error });
  }
};

module.exports = { postTurnos, getTurnos, putTurnos };
