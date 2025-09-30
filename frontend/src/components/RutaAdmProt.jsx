import React from "react";
import { Navigate } from "react-router";

const RutaAdmProt = ({ logeado, usuario, children }) => {
  if (!logeado || !usuario || usuario.rol.nombre !== "ADMIN") {
    return <Navigate to="*" replace />;
  }

  return children;
};

export default RutaAdmProt;
