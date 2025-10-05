import { useState } from "react";
import { Routes, Route } from "react-router";
import "./App.css";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Doctores from "./pages/Doctores";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Administrador from "./pages/Administrador";
import Turno from "./pages/Turno";
import RutaAdmProt from "./components/RutaAdmProt";
import Page404 from "./pages/Page404";

function App() {
  const [usuarioLog, setUsuarioLog] = useState({});
  const [logeado, setLogeado] = useState(false);
  return (
    <div id="caja">
      <div className="border-bottom border-dark sticky-top">
        <NavBar
          usuarioLog={usuarioLog}
          logeado={logeado}
          cambioLog={setUsuarioLog}
          exitLog={setLogeado}
        />
      </div>

      <Routes>
        <Route
          path="/"
          element={<Homepage usuarioLog={usuarioLog} logeado={logeado} />}
        />
        <Route
          path="/login"
          element={<Login usuarioActual={setUsuarioLog} logeado={setLogeado} />}
        />
        <Route
          path="/doctores/:especialidad"
          element={<Doctores usuarioLog={usuarioLog} logeado={logeado} />}
        />
        <Route
          path="/admin"
          element={
            <RutaAdmProt logeado={logeado} usuario={usuarioLog}>
              <Administrador />
            </RutaAdmProt>
          }
        />
        <Route path="/turno" element={<Turno />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
