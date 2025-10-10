import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";

const NavBar = ({ usuarioLog, logeado, exitLog, cambioLog }) => {
  const location = useLocation();
  const exit = () => {
    cambioLog({});
    exitLog(false);
    localStorage.removeItem("token");
    navigate("/");
  };
  const checkeoToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      exitLog(true);
    } else {
      exitLog(false);
    }
  };
  useEffect(() => {
    checkeoToken();
  });
  const navigate = useNavigate();
  return (
    <nav className="navbar  navbar-light bg-light d-flex justify-content-between">
      <Link className="navbar-brand ms-1" to="/">
        Consultorio Medico V.2
      </Link>
      {usuarioLog?.rol?.nombre === "ADMIN" && logeado ? (
        <Link
          className={
            location.pathname === `/admin`
              ? "btn btn-warning border border-dark disabled"
              : `btn btn-warning border border-dark`
          }
          to="/admin"
        >
          ADMIN
        </Link>
      ) : (
        ""
      )}

      {usuarioLog && logeado ? (
        <div className="">
          <span
            className="btn btn-sm btn-ligth shadow"
            onClick={() => navigate("/turno")}
          >
            {usuarioLog.nombre}
          </span>
          <span className="btn btn-sm btn-danger ms-3 me-2" onClick={exit}>
            {" "}
            Salir{" "}
          </span>
        </div>
      ) : (
        <Link to="/login" className="btn btn-primary me-1">
          Ingresar
        </Link>
      )}
    </nav>
  );
};

export default NavBar;
