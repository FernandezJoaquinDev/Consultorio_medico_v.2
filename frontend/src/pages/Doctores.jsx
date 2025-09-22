import React, { useState } from "react";
import { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router";

const Doctores = () => {
  const { especialidad } = useParams();
  const [cargando, setCargando] = useState(true);
  const [doctores, setDoctores] = useState([]);

  const cargaDatos = async () => {
    const resp = await fetch(`http://localhost:5000/doctores/${especialidad}`, {
      headers: { "Content-Type": "application/json" },
    });
    const data = await resp.json();
    console.log(resp);
    console.log(data);
    if (resp.ok) {
      setDoctores(data);
    } else {
      console.log("Error al obtener a los medicos");
    }
  };

  useEffect(() => {
    cargaDatos();
  }, [especialidad]);

  return (
    <div className="container-fluid">
      <Link className="btn btn-danger mt-3" to="/">
        <FaArrowLeft />
      </Link>
      <div className="row ms-5">
        {doctores.length === 0 ? (
          <h3>No hay especialistas</h3>
        ) : (
          doctores.map((item, index) => (
            <div className="col-sm-12 col-md-2 d-flex" key={index}>
              <div className="card mt-3 flex-fill h-100">
                <div className="card-title text-center">
                  <h3>{item.nombre}</h3>
                </div>
                <div className="card-body d-flex flex-column justify-content-end">
                  <span>Especialidad: {item.especialidad.nombre}</span>

                  <span
                    className="text-end"
                    style={item.estado ? { color: "green" } : { color: "red" }}
                  >
                    {item.estado ? "Activo" : "Inactivo"}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Doctores;
