import "./pages.css";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
const apiUrl = import.meta.env.VITE_URL_API;

function Auth() {
  const location = useLocation();
  const navi = useNavigate();
  const [cargando, setCargando] = useState(false);
  const [showError, setShowError] = useState(false);
  const [inpEmail, setInpEmail] = useState("");
  const [inpPass, setInpPass] = useState("");
  const [inpFN, setInpFN] = useState("");
  const [inpLN, setInpLN] = useState("");
  const logearse = (e) => {
    e.preventDefault();
    setShowError(false);

    setCargando(true);

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
      .then((res) => {
        /*
        if (res.status != 200) {
          setShowError(true);
        }*/
        console.log(res);
        return res.json();
      })
      .then((data) => {
        setCargando(false);

        if (data.message) {
          setShowError(true);
        }
        if (data.token) {
          navi("/react-depas/perfil");
          sessionStorage.setItem("tk", data.token);
        }
      })
      .catch((err) => console.log(err));
  };
  const registrarse = (e) => {
    e.preventDefault();
    setCargando(true);

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
          setCargando(true);

          navi("/react-depas/verify", {
            state: {
              emailData: inpEmail,
            },
          });
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="Auth_pages">
      <div className="Auth__box_form">
        {location.pathname === "/react-depas/auth/login" ? (
          <form onSubmit={logearse}>
            <div className="form_item">
              <h2>Iniciar sesion</h2>
            </div>
            <div className="form_item">
              <label htmlFor="inpEmail">Email</label>
              <input
                required
                onChange={(e) => setInpEmail(e.target.value)}
                type="email"
                id="inpEmail"
              />
            </div>
            <div className="form_item">
              <label htmlFor="inpPass">Contraseña</label>
              <input
                required
                onChange={(e) => setInpPass(e.target.value)}
                type="password"
                id="inpPass"
                min={2}
              />
            </div>
            <div className="form_item form_item_extra">
              {showError ? <p>Error con el usuario o la Contraseña</p> : null}

              {cargando ? <p>Cargando...</p> : null}
            </div>

            <div className="form_item">
              <button>Ingresar</button>
            </div>
            <div className="form_item">
              <Link to="/react-depas/auth/register">Registrarse</Link>
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
                required
                onChange={(e) => setInpFN(e.target.value)}
                type="text"
                id="inpfn"
              />
            </div>
            <div className="form_item">
              <label htmlFor="inpape">Apellido</label>
              <input
                required
                onChange={(e) => setInpLN(e.target.value)}
                type="text"
                id="inpape"
              />
            </div>
            <div className="form_item">
              <label htmlFor="inpEmail">Email</label>
              <input
                required
                onChange={(e) => setInpEmail(e.target.value)}
                type="email"
                id="inpEmail"
              />
            </div>

            <div className="form_item">
              <label htmlFor="inpPass">Contraseña</label>
              <input
                required
                onChange={(e) => setInpPass(e.target.value)}
                type="password"
                id="inpPass"
              />
              {cargando ? <p>Cargando...</p> : null}
            </div>
            <div className="form_item">
              <button>Registrarse</button>
            </div>
            <div className="form_item">
              <Link to="/react-depas/auth/login">Iniciar Sesion</Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Auth;
