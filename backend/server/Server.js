const express = require("express");
const cors = require("cors");
const doctoresRoutes = require("../routes/doctoresRoutes");
const especialidadesRoutes = require("../routes/especialidadesRoutes");
const loginRoute = require("../routes/loginRoute");
const rolRoutes = require("../routes/rolRoutes");
const usuariosRoutes = require("../routes/usuariosRoutes");
const conectardb = require("../db/mongoConecction");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 5000;
    this.middlewares();
    this.conectarBD();
    this.paths = {
      usuario: "/usuario",
      login: "/login",
      doctores: "/doctores",
      rol: "/rol",
      especialidades: "/especialidades",
    };
    this.routes();
  }
  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }
  routes() {
    this.app.use(this.paths.usuario, usuariosRoutes);
    this.app.use(this.paths.doctores, doctoresRoutes);
    this.app.use(this.paths.especialidades, especialidadesRoutes);
    this.app.use(this.paths.rol, rolRoutes);
    this.app.use(this.paths.login, loginRoute);
  }
  conectarBD() {
    conectardb();
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`servidor corriendo en el puerto: ${this.port}`);
    });
  }
}

module.exports = Server;
