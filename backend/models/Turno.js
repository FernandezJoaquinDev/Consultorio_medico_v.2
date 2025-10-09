const mongoose = require("mongoose");

const TurnoSchema = mongoose.Schema(
  {
    fecha: {
      type: Date,
      required: [true, "La fecha es necesaria"],
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: [true, "El doctor es necesario"],
    },
    paciente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
    },
    estado: {
      type: Boolean,
      default: true,
    },
  },
  { collection: "Turnos" }
);

TurnoSchema.methods.toJSON = function () {
  const { __v, ...turnos } = this.toObject();
  return turnos;
};

module.exports = mongoose.model("Turno", TurnoSchema);
