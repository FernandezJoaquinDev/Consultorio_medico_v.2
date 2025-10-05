export const darDeBaja = async (usuario) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return alert("no cuenta con permiso de administrador");
  }
  const resp = await fetch("http://localhost:5000/usuario", {
    method: "DELETE",
    headers: { "content-type": "application/json", auth: `${token}` },
    body: JSON.stringify({ dni: usuario }),
  });
  const data = await resp.json();
  alert(data.msg);
};

export const darDeAlta = async (usuario) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return alert("no cuenta con permisos de administrador");
  }
  const resp = await fetch("http://localhost:5000/usuario", {
    method: "PUT",
    headers: { "content-type": "application/json", auth: `${token}` },
    body: JSON.stringify({ dni: usuario }),
  });
  const data = await resp.json();
  alert(data.msg);
};

export const crearEspec = async (espec) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return alert("no cuenta con permisos de administrador");
  }
  const resp = await fetch("http://localhost:5000/especialidades", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      auth: `${token}`,
    },
    body: JSON.stringify({ nombre: espec }),
  });
  const data = await resp.json();
  alert(data.msg);
};

export const darDeBajaEspecialidad = async (espec) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return alert("no cuenta con permisos de administrador");
  }
  const resp = await fetch("http://localhost:5000/especialidades", {
    method: "DELETE",
    headers: { "content-type": "application/json", auth: `${token}` },
    body: JSON.stringify({ nombre: espec }),
  });
  const data = await resp.json();
  alert(data.msg);
};

export const darDeAltaEspecialidad = async (espec) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return alert("no cuenta con permisos de administrador");
  }
  const resp = await fetch("http://localhost:5000/especialidades", {
    method: "PUT",
    headers: { "content-type": "application/json", auth: `${token}` },
    body: JSON.stringify({ nombre: espec }),
  });
  const data = await resp.json();
  alert(data.msg);
};

export const cambiarRol = async (dni, rolBusc) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return alert("no cuenta con permisos de administrador");
  }
  const resp = await fetch("http://localhost:5000/usuario/rol", {
    method: "PUT",
    headers: { "content-type": "application-json", auth: `${token}` },
    body: JSON.stringify({ dni, rolBusc }),
  });
  const data = await resp.json();
  console.log(data.msg);
};

export const crearRol = async (rolDes) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return alert("no cuenta con permisos de administrador");
  }
  const resp = await fetch("http://localhost:5000/rol", {
    method: "POST",
    headers: { "content-type": "application/json", auth: `${token}` },
    body: JSON.stringify({ nombre: rolDes }),
  });
  const data = await resp.json();
  alert(data.msg);
};

export const darDeAltaRol = async (rolDes) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return alert("no cuenta con permisos de administrador");
  }
  const resp = await fetch("http://localhost:5000/rol", {
    method: "PUT",
    headers: { "content-type": "application/json", auth: `${token}` },
    body: JSON.stringify({ nombre: rolDes }),
  });
  const data = await resp.json();
  alert(data.msg);
};

export const darDeBajaRol = async (rolDes) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return alert("no cuenta con permisos de administrador");
  }
  const resp = await fetch("http://localhost:5000/rol", {
    method: "DELETE",
    headers: { "content-type": "application/json", auth: `${token}` },
    body: JSON.stringify({ nombre: rolDes }),
  });
  const data = await resp.json();
  alert(data.msg);
};
