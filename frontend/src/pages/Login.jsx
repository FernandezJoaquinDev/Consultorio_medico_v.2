import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router";

const Login = ({ usuarioActual, logeado }) => {
  const navigate = useNavigate();
  const [pacienteNuevo, setPacienteNuevo] = useState({
    nombre: "",
    dni: "",
    email: "",
    contraseña: "",
  });

  const [pacienteIngreso, setpacienteIngreso] = useState({
    dniIngreso: "",
    contraseñaIngreso: "",
  });

  const handlechangeRegistro = (e) => {
    e.preventDefault();
    setPacienteNuevo({ ...pacienteNuevo, [e.target.name]: e.target.value });
  };
  const handleChangeIngreso = (e) => {
    setpacienteIngreso({ ...pacienteIngreso, [e.target.name]: e.target.value });
  };
  const handleSubmitRegistro = async () => {
    const resp = await fetch("http://localhost:5000/usuario", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: pacienteNuevo.nombre,
        dni: pacienteNuevo.dni,
        email: pacienteNuevo.email,
        contraseña: pacienteNuevo.contraseña,
      }),
    });
    const data = await resp.json();
    if (!resp.ok) {
      alert(data.msg);
    } else {
      alert(data.msg);
      navigate("/");
    }
  };
  const handleSubmitIngreso = async () => {
    const resp = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dni: pacienteIngreso.dniIngreso,
        contraseña: pacienteIngreso.contraseñaIngreso,
      }),
    });
    const data = await resp.json();
    if (!resp.ok) {
      console.log(data.msg);
    } else {
      localStorage.setItem("token", data.token);
      usuarioActual(data.usuario);

      logeado(true);
      navigate("/");
    }
  };

  return (
    <div>
      <Link to="/" className="btn btn-danger text-start mt-1 ms-3">
        <FaArrowLeft />
      </Link>

      <div className="container mt-3">
        <div className="row border-bottom border-dark mb-3">
          <input
            type="text"
            placeholder="Ingrese su Nombre"
            name="nombre"
            className={`form-control mb-1 border border-dark `}
            onChange={handlechangeRegistro}
          />
          <input
            type="text"
            placeholder="Ingrese su DNI"
            name="dni"
            className="form-control mb-1 border border-dark"
            onChange={handlechangeRegistro}
          />
          <input
            type="text"
            placeholder="Ingrese su Email"
            name="email"
            className="form-control mb-1 border border-dark"
            onChange={handlechangeRegistro}
          />
          <input
            type="text"
            placeholder="Ingrese una Contraseña"
            name="contraseña"
            className="form-control mb-2 border border-dark"
            onChange={handlechangeRegistro}
          />
          <input
            type="button"
            value="Registrarse"
            className={`btn btn-primary border-dark mb-2 ${
              pacienteNuevo.contraseña === "" ? "disabled" : ""
            }`}
            onClick={handleSubmitRegistro}
          />
        </div>
        <div className="row d-flex mt-3 mb-5">
          <div className="text-center">
            <h2>¿Ya tiene una cuenta?</h2>
          </div>
          <div>
            <input
              type="text"
              className="form-control border border-dark mb-1"
              placeholder="DNI"
              name="dniIngreso"
              onChange={handleChangeIngreso}
            />
            <input
              type="password"
              className="form-control border border-dark mb-2"
              placeholder="Contraseña"
              name="contraseñaIngreso"
              onChange={handleChangeIngreso}
            />
          </div>
          <input
            type="button"
            className={`btn btn-success border-dark ${
              pacienteIngreso.contraseñaIngreso === "" ? "disabled" : ""
            }`}
            value="Ingresar"
            onClick={handleSubmitIngreso}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
