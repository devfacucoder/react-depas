import "./pages.css";
import { useEffect, useState } from "react";
const apiUrl = import.meta.env.VITE_URL_API;
import AlertModal from "../components/AlertModal";
import AlerRole from "../components/AlertRole";

function Panel() {
  const [dateUsers, setDateUsers] = useState([]);
  const [showAlerModal, setShowAlerModal] = useState(false);
  const [showAlertRole, setShowAlertRole] = useState(false);
  const [idForDeleteUser, setIdForDeleteUser] = useState("");
  const [permitido, setPermitido] = useState(false);

  const eliminarUsuario = async () => {
    const response = await fetch(apiUrl + `/api/panel/user/${idForDeleteUser}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("tk")}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      setPermitido(true);
      await response.json(); // Asegúrate de esperar la respuesta JSON
      console.log("eliminado");
      setShowAlerModal(false)
      setDateUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== idForDeleteUser)
      );
    } else if (response.status === 403) {
      setShowAlertRole(true);
      setPermitido(false);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(apiUrl + `/api/users/`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("tk")}`,
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        setPermitido(true);
        const data = await res.json(); // Espera a que se resuelva la promesa JSON
        setDateUsers(data);
      } else if (res.status === 403) {
        console.log("error");
      }
    };

    fetchUsers().catch(err => console.log(err)); // Manejo de errores
  }, []);

  return (
    <div className="Panel">
      <AlertModal
        funMain={eliminarUsuario}
        show={showAlerModal}
        ctrlModal={setShowAlerModal}
      />
      <AlerRole show={showAlertRole} />
      <h1>Panel de Control</h1>
      <div className="Box_Panel_Users">
        <ul>
          {permitido ? (
            dateUsers.map((e, index) => (
              <li key={index}>
                <p>{e._id}</p>
                <p>{e.firtsName + " " + e.lastName}</p>
                <p>{e.email}</p>
                <div>
                  <button
                    onClick={() => {
                      setShowAlerModal(true);
                      setIdForDeleteUser(e._id);
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p>Loading</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Panel;
