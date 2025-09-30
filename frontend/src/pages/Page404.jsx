import React from "react";
import { Link } from "react-router";

const Page404 = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="text-center p-4 shadow rounded bg-white">
        <h1 className="display-4 text-danger mb-3">404</h1>
        <h2 className="h5 text-secondary mb-3">
          Página no encontrada o no cuenta con los permisos para acceder
        </h2>
        <Link to="/" className="btn btn-primary mt-3">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default Page404;
