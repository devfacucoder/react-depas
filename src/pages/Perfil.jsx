import "./pages.css";
import CardDepa from "../components/CardDepa";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_URL_API;

function Perfil() {
  document.body.style.overflow = "auto";

  const navi = useNavigate();
  const [dataUser, setDataUser] = useState(null); // Cambié el valor inicial a null
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga

  const [dataDepa, setDataDepa] = useState(null);
  const [loadDepa, setLoadDepa] = useState(true);

  useEffect(() => {
    if (!sessionStorage.getItem("tk")) {
      navi("/react-depas/auth/login");
    }
    fetch(apiUrl + "/api/users/perfil", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("tk")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.message == "Invalid or expired token") {
          navi("/react-depas/auth/login");
        } else {
          setDataUser(data); // Guardar los datos del usuario
          setLoading(false); // Cambiar el estado de carga
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Detener el estado de carga si hay un error
      });
  }, []);
  useEffect(() => {
    if (dataUser) {
      const requestDepas = {
        depasUrl: dataUser.depas,
      };
      fetch(apiUrl + "/api/depa/depausers", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(requestDepas),
      })
        .then((res) => res.json())
        .then((data) => {
          setDataDepa(data);
          setLoadDepa(false);
        })
        .catch((err) => console.log(err));
    }
  }, [loading]);

  if (loading) {
    return <div>Cargando...</div>; // Mostrar un mensaje de carga
  }
  if (!dataUser) {
    return <div>Error al cargar los datos</div>; // Mostrar un mensaje de error si los datos no se cargaron correctamente
  }

  return (
    <div className="Perfil">
      <div className="box_Perfil">
        <span>
          <h3>{dataUser.firtsName || "Nombre no disponible"}</h3>
          <h3>{dataUser.lastName || "Apellido no disponible"}</h3>
        </span>
        <h3>Email: {dataUser.email || "Email no disponible"}</h3>
      </div>
      <div className="box_list_Card_adepas">
        <ul>
          {dataDepa && dataDepa.length > 0 ? (
            dataDepa.map((e, index) => (
              <li key={index}>
                <Link
                  to={`/react-depas/depa/${e._id}`}
                  state={{
                    depaData: e,
                    userName: {
                      firtsName: dataUser.firtsName,
                      lastName: dataUser.lastName,
                      email: dataUser.email,
                      id: dataUser._id,
                      contactNumber: dataUser.contactNumber,
                    },
                  }}
                >
                  <CardDepa
                    key={index}
                    imgUrl={e.imgs}
                    precio={e.price}
                    title={e.title}
                    location={e.location}
                  />
                </Link>
              </li>
            ))
          ) : (
            <p>No se encontraron departamentos.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Perfil;
