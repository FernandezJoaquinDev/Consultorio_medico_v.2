import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

const NavBar = ({ usuarioLog, logeado, exitLog, cambioLog }) => {
  const location = useLocation();
  const exit = () => {
    cambioLog({});
    exitLog(false);
    localStorage.removeItem("token");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between"
      style={{ width: "100%" }}
    >
      <Link className="navbar-brand" to="/">
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
          <span>{usuarioLog.nombre}</span>
          <span className="btn btn-sm btn-danger ms-3" onClick={exit}>
            {" "}
            Salir{" "}
          </span>
        </div>
      ) : (
        <Link to="/login" className="btn btn-primary">
          Ingresar
        </Link>
      )}
    </nav>
  );
};

export default NavBar;
