const mongoose = require("mongoose");

const RolSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El nombre del rol es obligatorio"],
    unique: true,
  },
  estado: {
    type: Boolean,
    default: true,
  },
});

RolSchema.virtual("usuarios", {
  ref: "Usuario",
  localField: "_id",
  foreignField: "rol",
  count: true,
});

RolSchema.set("toJSON", { virtuals: true });
RolSchema.set("toObject", { virtuals: true });

RolSchema.methods.toJSON = function () {
  const { __v, ...rol } = this.toObject();
  return rol;
};

module.exports = mongoose.model("Rol", RolSchema);
