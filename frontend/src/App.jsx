import { useState } from "react";
import { Routes, Route } from "react-router";
import "./App.css";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Doctores from "./pages/Doctores";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="container-fluid" id="caja">
      <div className="border-bottom border-dark sticky-top">
        <NavBar />
      </div>

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctores/:especialidad" element={<Doctores />} />
      </Routes>
      <div className="border-top border-dark fixed-bottom" id="footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
