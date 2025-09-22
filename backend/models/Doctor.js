const mongoose = require("mongoose");

const DoctorSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El nombre del doctor es necesario"],
  },
  especialidad: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Especialidad",
    required: [true, "La especialidad es necesaria"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
});

DoctorSchema.methods.toJSON = function () {
  const { __v, ...doctor } = this.toObject();
  return doctor;
};

module.exports = mongoose.model("Doctor", DoctorSchema);
