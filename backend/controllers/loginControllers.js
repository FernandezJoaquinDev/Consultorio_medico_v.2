const generarJWT = require("../helpers/generarToken");
const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");

const postLogin = async (req, res) => {
  const { dni, contraseña } = req.body;
  try {
    const encontrado = await Usuario.findOne({ dni });
    if (encontrado && encontrado.estado) {
      const evaluar = bcrypt.compareSync(contraseña, encontrado.contraseña);
      if (evaluar) {
        const token = await generarJWT(encontrado._id);
        if (token) {
          sessionStorage.setItem("token", token);
          res.json({ msg: "login exitoso" });
        } else {
          res
            .status(401)
            .json({ msg: "Error al crear el token de autentificacion" });
        }
      } else {
        res.status(400).json({ msg: "dni o contraseña incorrecta" });
      }
    } else {
      res.status(400).json({ msg: "dni o contraseña incorrecta" });
    }
  } catch (error) {
    res.status(400).json({ msg: `Error en el servidor: ${error}` });
  }
};

module.exports = { postLogin };
