import React from "react";
import { Link, useNavigate } from "react-router";
import "../css/Homepage.css";
import { FaGithub, FaInstagramSquare, FaBriefcase } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { useState } from "react";

const Homepage = ({ usuarioLog, logeado }) => {
  return (
    <div className="" id="caja">
      <section id="registrarse">
        <div className="container d-flex justify-content-center align-items-center">
          <div className="row mt-5">
            <h2 className="text-center mt-5">¿Necesitas un turno?</h2>
            <Link
              to={logeado ? `/turno` : `/login`}
              className="btn btn-primary btn-lg"
            >
              {logeado ? `Sacar un turno...` : `Ingresar...`}
            </Link>
          </div>
        </div>
      </section>
      <section id="about" className=" border-top border-ligth">
        <div className="container">
          <div className="row text-center mt-5">
            <h2 className="mt-5">¿Que es Consultorio Medico v.2?</h2>
            <p>
              Este proyecto es una landing page con implementacion de api rest
              usando de base una maquetacion realizada cuando inicie en el mundo
              de la programacion, con el objetivo de implementar todos mis
              conocimientos actuales.
              <br />
              (Todo el contenido que se vea es ficticio y a modo de proyecto de
              estudio).
            </p>
          </div>
        </div>
      </section>
      <section id="especialidades" className=" border-top border-ligth">
        <div className="container text-center ">
          <div className="row mt-5">
            <h2>Conozca a nuestros profesionales...</h2>
          </div>
          <div className="row  mb-3">
            <Link
              className="col mt-4 me-2 especialidad"
              to={`/doctores/CARDIOLOGIA`}
            >
              Cardiología
            </Link>
            <Link
              className="col mt-4 me-2 especialidad"
              to={`/doctores/CLINICA`}
            >
              Clinica
            </Link>
            <Link
              className="col mt-4 me-2 especialidad"
              to={`/doctores/DERMATOLOGIA`}
            >
              Dermatologia
            </Link>
          </div>
          <div className="row mb-3">
            <Link
              className="col mt-4 me-2 especialidad"
              to={`/doctores/TRAUMATOLOGIA`}
            >
              Traumatologia
            </Link>
            <Link
              className="col mt-4 me-2 especialidad"
              to={`/doctores/NEUROLOGIA`}
            >
              Neurologia
            </Link>
            <Link
              className="col mt-4 me-2 especialidad"
              to={`/doctores/PSICOLOGIA`}
            >
              Psicologia
            </Link>
          </div>
          <div className="row">
            <Link
              className="col mt-4 me-2 especialidad"
              to={`/doctores/PEDIATRIA`}
            >
              Pediatria
            </Link>
            <Link
              className="col mt-4 me-2 especialidad"
              to={`/doctores/ODONTOLOGIA`}
            >
              Odontologia
            </Link>
            <Link
              className="col mt-4 me-2 especialidad"
              to={`/doctores/PSIQUIATRIA`}
            >
              Psiquiatria
            </Link>
          </div>
        </div>
      </section>
      <section id="contacto" className="border-top border-ligth">
        <div className="container text-center">
          <div className="row mt-3">
            <h2>Metodos de Contacto</h2>
          </div>
          <div className="row mt-2">
            <div className="col ">
              <IoMdMail size={50} />
            </div>
            <div className="col ">
              <FaGithub size={50} />
            </div>
            <div className="col ">
              <FaBriefcase size={50} />
            </div>
            <div className="col ">
              <FaInstagramSquare size={50} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
