import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import dayjs from "dayjs";

const Turno = () => {
  const [turnos, setTurnos] = useState([]);
  const [fechaAct, setFechaAct] = useState("");

  const traerTurnos = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return alert("no tiene permiso para efectuar la accion");
    }
    const resp = await fetch("http://localhost:5000/turnos", {
      headers: { "content-type": "application/json", auth: `${token}` },
    });
    const data = await resp.json();
    setTurnos(data);
  };

  const obtenerFecha = () => {
    setFechaAct(dayjs(Date()).format("DD/MM/YYYY"));
  };

  const eliminarTurno = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return alert("no tiene permiso para efectuar la accion");
    }
    const resp = await fetch("http://localhost:5000/turnos", {
      method: "PUT",
      headers: { "content-type": "application/json", auth: `${token}` },
      body: JSON.stringify({ id }),
    });
    const data = await resp.json();
    alert(data.msg);
  };

  useEffect(() => {
    traerTurnos();
    obtenerFecha();
  }, [turnos]);

  return (
    <div className="text-center">
      <div className="titulo mb-3">
        <h2>Turnos del paciente:</h2>
      </div>
      <div className="turnos container">
        {turnos && turnos.length > 0 ? (
          <div className="row">
            {turnos.map((item, index) => (
              <div className="col-12 col-md-4" key={index}>
                <div className="card border border-dark shadow mb-3">
                  <span
                    onClick={() => eliminarTurno(item._id)}
                    class="position-absolute top-0 start-100 translate-middle badge rounded-pill btn btn-sm btn-danger"
                  >
                    x
                  </span>
                  <div className="card-title">
                    {item.doctor.especialidad.nombre}
                  </div>
                  <div className="card-body d-flex flex-column">
                    <span>{dayjs(item.fecha).format("DD/MM/YYYY HH:mm")}</span>
                    <span>{item.doctor.nombre}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h2>Usted no tiene turnos reservados aún</h2>
        )}
      </div>
    </div>
  );
};

export default Turno;
