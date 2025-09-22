const jwt = require("jsonwebtoken");

const validarToken = (req, res, next) => {
  const token = req.header("auth");
  if (!token) {
    return res.status(400).json({ msg: "No se encontro ningun token valido" });
  }

  try {
    const { id } = jwt.verify(token, process.env.TKN_PASS);
    req.id = id;
    next();
  } catch (error) {
    return res.status(400).json({ msg: "El token no es valido" });
  }
};

module.exports = validarToken;
