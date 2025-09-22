const mongoose = require("mongoose");

const EspecialidadSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El nombre de la especialidad es necesario"],
    unique: true,
  },
  estado: {
    type: Boolean,
    default: true,
  },
});

EspecialidadSchema.virtual("doctores", {
  ref: "Doctor",
  localField: "_id",
  foreignField: "especialidad",
  count: true,
});

EspecialidadSchema.set("toJSON", { virtuals: true });
EspecialidadSchema.set("toObject", { virtuals: true });

EspecialidadSchema.methods.toJSON = function () {
  const { __v, ...espec } = this.toObject();
  return espec;
};

module.exports = mongoose.model("Especialidad", EspecialidadSchema);
