import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

const NavBar = () => {
  const location = useLocation();
  const [estoyEnLogin, setEstoyEnLogin] = useState(false);
  useEffect(() => {
    if (location.pathname === "/login") {
      setEstoyEnLogin(true);
    } else {
      setEstoyEnLogin(false);
    }
  }, [location]);
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between"
      style={{ width: "100%" }}
    >
      <Link className="navbar-brand" to="/">
        Consultorio Medico V.2
      </Link>
      {!estoyEnLogin && (
        <Link to="/login" className="btn btn-primary">
          Registrarse
        </Link>
      )}
    </nav>
  );
};

export default NavBar;
