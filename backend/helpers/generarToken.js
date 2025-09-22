const jwt = require("jsonwebtoken");

const generarJWT = (id) => {
  return new Promise((resolve, reject) => {
    const payload = { id };
    jwt.sign(
      payload,
      process.env.TKN_PASS,
      { expiresIn: "4h" },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se genero el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = generarJWT;
