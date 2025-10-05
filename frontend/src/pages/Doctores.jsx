import React, { useState } from "react";
import { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { data, Link, useNavigate, useParams } from "react-router";
import { LuDot } from "react-icons/lu";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

const Doctores = ({ usuarioLog, logeado }) => {
  const navigate = useNavigate();
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

  const cambioEstado = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return alert("no tiene permisos de administrador");
    }
    const respAdm = await fetch(`http://localhost:5000/doctores/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json", auth: `${token}` },
    });
    const dataAdm = await respAdm.json();
    navigate(-1);
  };

  useEffect(() => {
    cargaDatos();
  }, [especialidad]);

  return (
    <div className="container-fluid">
      <span className="btn btn-danger mt-3" onClick={() => navigate(-1)}>
        <FaArrowLeft />
      </span>
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
                  <div className="text-end align-items-center">
                    {usuarioLog?.rol?.nombre === "ADMIN" && logeado ? (
                      <span
                        className={
                          item.estado
                            ? `border border-dark btn btn-sm btn-danger`
                            : "border border-dark btn btn-sm btn-success"
                        }
                        onClick={() => cambioEstado(item._id)}
                      >
                        {item.estado ? (
                          <FaXmark style={{ fontSize: "19px" }} />
                        ) : (
                          <FaCheck style={{ fontSize: "19px" }} />
                        )}
                      </span>
                    ) : (
                      ""
                    )}

                    <span
                      style={
                        item.estado
                          ? {
                              color: "green",
                              fontSize: "30px",
                              textAlign: "center",
                            }
                          : {
                              color: "red",
                              fontSize: "30px",
                              textAlign: "center",
                            }
                      }
                      className="text-end"
                    >
                      <LuDot />
                    </span>
                    <span
                      className="text-end"
                      style={
                        item.estado ? { color: "green" } : { color: "red" }
                      }
                    >
                      {item.estado ? "Activo" : "Inactivo"}
                    </span>
                  </div>
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
