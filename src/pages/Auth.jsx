import "./pages.css";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
const apiUrl = import.meta.env.VITE_URL_API;
function Auth() {
  const location = useLocation();
  const navi = useNavigate();

  const [inpEmail, setInpEmail] = useState("");
  const [inpPass, setInpPass] = useState("");
  const [inpFN, setInpFN] = useState("");
  const [inpLN, setInpLN] = useState("");
  const logearse = (e) => {
    e.preventDefault();
    const bodyRequest = {
      email: inpEmail,
      password: inpPass,
    };

    fetch(apiUrl + "/api/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(bodyRequest),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          sessionStorage.setItem("tk", data.token);
          navi("/perfil");
        }
      })
      .catch((err) => console.log(err));
  };
  const registrarse = (e) => {
    e.preventDefault();
    const bodyRequest = {
      firtsName: inpFN,
      lastName: inpLN,
      email: inpEmail,
      password: inpPass,
    };

    fetch(apiUrl + "/api/auth/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(bodyRequest),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
            sessionStorage.setItem("tk", data.token);
            navi("/perfil");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="Auth_pages">
      <div className="Auth__box_form">
        {location.pathname === "/auth/login" ? (
          <form onSubmit={logearse}>
            <div className="form_item">
              <h2>Iniciar sesion</h2>
            </div>
            <div className="form_item">
              <label htmlFor="inpEmail">Email</label>
              <input
                onChange={(e) => setInpEmail(e.target.value)}
                type="text"
                id="inpEmail"
              />
            </div>
            <div className="form_item">
              <label htmlFor="inpPass">Contraseña</label>
              <input
                onChange={(e) => setInpPass(e.target.value)}
                type="password"
                id="inpPass"
              />
            </div>
            <div className="form_item">
              <button>Ingresar</button>
            </div>
            <div className="form_item">
              <Link to="/auth/register">Registrarse</Link>
            </div>
          </form>
        ) : (
          <form onSubmit={registrarse}>
            <div className="form_item">
              <h2>Registrarse</h2>
            </div>
            <div className="form_item">
              <label htmlFor="inpfn">Nombre</label>
              <input
                onChange={(e) => setInpFN(e.target.value)}
                type="text"
                id="inpfn"
              />
            </div>
            <div className="form_item">
              <label htmlFor="inpape">Apellido</label>
              <input
                onChange={(e) => setInpLN(e.target.value)}
                type="text"
                id="inpape"
              />
            </div>
            <div className="form_item">
              <label htmlFor="inpEmail">Email</label>
              <input
                onChange={(e) => setInpEmail(e.target.value)}
                type="text"
                id="inpEmail"
              />
            </div>

            <div className="form_item">
              <label htmlFor="inpPass">Contraseña</label>
              <input
                onChange={(e) => setInpPass(e.target.value)}
                type="password"
                id="inpPass"
              />
            </div>
            <div className="form_item">
              <button>Registrarse</button>
            </div>
            <div className="form_item">
              <Link to="/auth/login">Iniciar Sesion</Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Auth;
