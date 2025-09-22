const mongoose = require("mongoose");

const UsuarioSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El nombre del usuario es necesario"],
  },
  dni: {
    type: Number,
    required: [true, "El dni del usuario es necesario"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "El email del usuario es necesario"],
    unique: true,
  },
  contraseña: {
    type: String,
    required: [true, "La contraseña es necesaria"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  rol: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rol",
  },
});

UsuarioSchema.methods.toJSON = function () {
  const { __v, contraseña, ...usuario } = this.toObject();
  return usuario;
};

module.exports = mongoose.model("Usuario", UsuarioSchema);
