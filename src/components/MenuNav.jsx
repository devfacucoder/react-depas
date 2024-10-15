import { useEffect, useState } from "react";
import { BsDatabaseCheck } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_URL_API;
function MenuNav({ fun, stt }) {
  const navi = useNavigate();
  const [permitido, setPermitido] = useState(false);
  const cerrarSession = () => {
    sessionStorage.removeItem("tk");
    navi("/react-depas/auth/login");
  };
  useEffect(() => {
    fetch(apiUrl + `/api/panel/permiso`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("tk")}`,
      },
    })
      .then((res) => {
        if (res.status == 200) {
          setPermitido(true);
          res.json();
        }else if(res.status==403){
          setPermitido(false);

        }
      })
      .then((data) => {
      });
  }, [sessionStorage.getItem("tk")]);
  if (stt) {
    return (
      <div className="MenuNav">
        <div className="MenuNav_box_btn">
          <button
            onClick={() => {
              fun(false);
            }}
          >
            x
          </button>
        </div>
        <ul>
          <li>
            <Link
              to={"/react-depas/"}
              onClick={() => {
                fun(false);
              }}
            >
              Inicio
            </Link>
          </li>
          <li>
            <Link
              to={"/react-depas/perfil"}
              onClick={() => {
                fun(false);
              }}
            >
              Perfil
            </Link>
          </li>
          <li>
            <Link
              to={"/react-depas/creardepa"}
              onClick={() => {
                fun(false);
              }}
            >
              Publicar
            </Link>
          </li>
          {permitido ? (
            <li
              onClick={() => {
                fun(false);
              }}
            >
              <Link to={"/react-depas/panel"}>Panel</Link>
            </li>
          ) : null}
        </ul>
        <button
          className="MenuNav_btn_logUt"
          onClick={() => {
            cerrarSession();
            fun(false);
          }}
        >
          Cerrar Sesion
        </button>
      </div>
    );
  } else {
    return <></>;
  }
}

export default MenuNav;
