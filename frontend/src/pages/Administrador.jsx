import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import {
  cambiarRol,
  crearEspec,
  crearRol,
  darDeAlta,
  darDeAltaEspecialidad,
  darDeAltaRol,
  darDeBaja,
  darDeBajaEspecialidad,
  darDeBajaRol,
} from "../helpers/AdmimFunct";

const Administrador = () => {
  const [doctorNew, setDoctorNew] = useState({ nombre: "", especialidad: "" });

  const handleChange = (e) => {
    setDoctorNew({ ...doctorNew, [e.target.name]: e.target.value });
  };

  const handleSubmitDoc = async () => {
    console.log("empecemo");
    const token = localStorage.getItem("token");
    if (!token) {
      return alert("no tiene permisos de administrador");
    }
    const resp = await fetch("http://localhost:5000/doctores", {
      method: "POST",
      headers: { "content-type": "application/json", auth: `${token}` },
      body: JSON.stringify({
        nombre: doctorNew.nombre,
        especialidad: doctorNew.especialidad,
      }),
    });
    const data = await resp.json();
    alert(data.msg);
  };

  const bajaUsuario = () => {
    const dniResp = prompt("ingrese el dni del usuario");
    darDeBaja(dniResp);
  };

  const altaUsuario = () => {
    const dniResp = prompt("Ingrese el dni del usuario");
    darDeAlta(dniResp);
  };

  const especNew = () => {
    const especResp = prompt("Ingrese el nombre");
    crearEspec(especResp);
  };

  const altaEspec = () => {
    const especResp = prompt("Ingrese el nombre");
    darDeAltaEspecialidad(especResp);
  };

  const bajaEspec = () => {
    const especResp = prompt("Ingrese el nombre");
    darDeBajaEspecialidad(especResp);
  };
  const darRol = () => {
    const dniResp = prompt("ingrese el dni del usuario");
    const rolResp = prompt("ingrese el rol que desea darle");
    cambiarRol(dniResp, rolResp);
  };
  const nuevoRol = () => {
    const rolResp = prompt("ingrese el nombre");
    crearRol(rolResp);
  };
  const altaRol = () => {
    const rolResp = prompt("Ingrese el nombre");
    darDeAltaRol(rolResp);
  };
  const bajaRol = () => {
    const rolResp = prompt("Ingrese el nombre");
    darDeBajaRol(rolResp);
  };
  return (
    <div className="container-fluid mt-3">
      <Link className="btn btn-danger mb-2" to="/">
        <FaArrowLeft />
      </Link>
      <div className="border border-dark mb-4 p-3">
        <h3 className="text-center">Herramientas de Administrador</h3>
      </div>
      <div className=" text-center">
        <div className="row-md-12 w-100 ">
          <div
            className="col-12 col-md-3 btn btn-lg btn-warning border border-dark me-2 mb-2"
            data-bs-toggle="modal"
            data-bs-target="#modalDoc"
          >
            <span>Agregar Doctor</span>
          </div>
          <div
            className="modal fade"
            id="modalDoc"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Ingrese los datos del profesional
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <input
                    type="text"
                    className="form-control border border-dark mb-2"
                    name="nombre"
                    placeholder="Ingrese el nombre..."
                    onChange={handleChange}
                  />
                  <div className="dropdown">
                    <a
                      className="btn btn-success dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Especialidades
                    </a>

                    <ul className="dropdown-menu">
                      <li
                        onClick={() =>
                          setDoctorNew({
                            ...doctorNew,
                            especialidad: "Cardiologia",
                          })
                        }
                      >
                        <a className="dropdown-item" href="#">
                          Cardiologia
                        </a>
                      </li>
                      <li
                        onClick={() =>
                          setDoctorNew({
                            ...doctorNew,
                            especialidad: "Clinica",
                          })
                        }
                      >
                        <a className="dropdown-item" href="#">
                          Clinica
                        </a>
                      </li>
                      <li
                        onClick={() =>
                          setDoctorNew({
                            ...doctorNew,
                            especialidad: "Dermatologia",
                          })
                        }
                      >
                        <a className="dropdown-item" href="#">
                          Dermatologia
                        </a>
                      </li>
                      <li
                        onClick={() =>
                          setDoctorNew({
                            ...doctorNew,
                            especialidad: "Traumatologia",
                          })
                        }
                      >
                        <a className="dropdown-item" href="#">
                          Traumatologia
                        </a>
                      </li>
                      <li
                        onClick={() =>
                          setDoctorNew({
                            ...doctorNew,
                            especialidad: "Neurologia",
                          })
                        }
                      >
                        <a className="dropdown-item" href="#">
                          Neurologia
                        </a>
                      </li>
                      <li
                        onClick={() =>
                          setDoctorNew({
                            ...doctorNew,
                            especialidad: "Psicologia",
                          })
                        }
                      >
                        <a className="dropdown-item" href="#">
                          Psicologia
                        </a>
                      </li>
                      <li
                        onClick={() =>
                          setDoctorNew({
                            ...doctorNew,
                            especialidad: "Pediatria",
                          })
                        }
                      >
                        <a className="dropdown-item" href="#">
                          Pediatria
                        </a>
                      </li>
                      <li
                        onClick={() =>
                          setDoctorNew({
                            ...doctorNew,
                            especialidad: "Odontologia",
                          })
                        }
                      >
                        <a className="dropdown-item" href="#">
                          Odontologia
                        </a>
                      </li>
                      <li
                        onClick={() =>
                          setDoctorNew({
                            ...doctorNew,
                            especialidad: "Psiquiatria",
                          })
                        }
                      >
                        <a className="dropdown-item" href="#">
                          Psiquiatria
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSubmitDoc}
                  >
                    Guardar Doctor
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            onClick={bajaUsuario}
            className="col-12 col-md-3 btn btn-lg btn-warning border border-dark ms-2 me-2 mb-2"
          >
            <span>Baja Usuario</span>
          </div>
          <div
            onClick={altaUsuario}
            className="col-12 col-md-3 btn btn-lg btn-warning border border-dark ms-2 me-2 mb-2"
          >
            <span>Alta Usuario</span>
          </div>
        </div>
        <div className="row-md-12 w-100">
          <div
            onClick={especNew}
            className="col-12 col-md-3 btn btn-lg btn-warning border border-dark  me-2 mb-2"
          >
            <span>Crear Especialidad</span>
          </div>
          <div
            onClick={bajaEspec}
            className="col-12 col-md-3 btn btn-lg btn-warning border border-dark ms-2 me-2 mb-2"
          >
            <span>Baja Especialidad</span>
          </div>
          <div
            onClick={altaEspec}
            className="col-12 col-md-3 btn btn-lg btn-warning border border-dark ms-2 me-2 mb-2"
          >
            <span>Alta Especialidad</span>
          </div>
        </div>
        <div className="row-md-12 w-100">
          <div
            onClick={darRol}
            className="col-12 col-md-3 btn btn-lg btn-warning border border-dark me-2 mb-2"
          >
            <span>Cambiar Rol</span>
          </div>
          <div
            onClick={nuevoRol}
            className="col-12 col-md-3 btn btn-lg btn-warning border border-dark ms-2 me-2 mb-2"
          >
            <span>Crear Rol</span>
          </div>
          <div
            onClick={altaRol}
            className="col-12 col-md-3 btn btn-lg btn-warning border border-dark ms-2 me-2 mb-2"
          >
            <span>Alta Rol</span>
          </div>
        </div>
        <div onClick={bajaRol} className="row-md-12 w-100">
          <div className="col-12 col-md-3 btn btn-lg btn-warning border border-dark ms-2 me-2 mb-2">
            <span>Baja Rol</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Administrador;
