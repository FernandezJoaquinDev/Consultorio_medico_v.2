import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router";

const Administrador = () => {
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
          <div className="col-12 col-md-3 btn btn-lg btn-warning border border-dark me-2 mb-2">
            <span>Agregar Doctor</span>
          </div>
          <div className="col-12 col-md-3 btn btn-lg btn-warning border border-dark ms-2 me-2 mb-2">
            <span>Baja Usuario</span>
          </div>
          <div className="col-12 col-md-3 btn btn-lg btn-warning border border-dark ms-2 me-2 mb-2">
            <span>Alta Usuario</span>
          </div>
        </div>
        <div className="row-md-12 w-100">
          <div className="col-12 col-md-3 btn btn-lg btn-warning border border-dark  me-2 mb-2">
            <span>Crear Especialidad</span>
          </div>
          <div className="col-12 col-md-3 btn btn-lg btn-warning border border-dark ms-2 me-2 mb-2">
            <span>Baja Especialidad</span>
          </div>
          <div className="col-12 col-md-3 btn btn-lg btn-warning border border-dark ms-2 me-2 mb-2">
            <span>Alta Especialidad</span>
          </div>
        </div>
        <div className="row-md-12 w-100">
          <div className="col-12 col-md-3 btn btn-lg btn-warning border border-dark me-2 mb-2">
            <span>Cambiar Rol</span>
          </div>
          <div className="col-12 col-md-3 btn btn-lg btn-warning border border-dark ms-2 me-2 mb-2">
            <span>Crear Rol</span>
          </div>
          <div className="col-12 col-md-3 btn btn-lg btn-warning border border-dark ms-2 me-2 mb-2">
            <span>Alta Rol</span>
          </div>
        </div>
        <div className="row-md-12 w-100">
          <div className="col-12 col-md-3 btn btn-lg btn-warning border border-dark ms-2 me-2 mb-2">
            <span>Baja Rol</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Administrador;
