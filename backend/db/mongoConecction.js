const mongoose = require("mongoose");

const conectardb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conectado a la base de datos");
  } catch (error) {
    console.log("Error al conectar con la base de datos", error);
    process.exit(1);
  }
};

module.exports = conectardb;
