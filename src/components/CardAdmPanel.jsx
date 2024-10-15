import "./components.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import AlertModal from "./AlertModal";
const apiUrl = import.meta.env.VITE_URL_API;

function CardAdmPanel({
  pDepas,
  pId,
  pRolId,
  pRolName,
  pNombre,
  pApellido,
  pEmail,
}) {
  const [rolSelect, setRolSelect] = useState(pRolName); // Rol seleccionado
  const [depasUsurs, setDepasUsers] = useState([]);
  const [showDepasUsers, setShowDepasUsers] = useState(false);
  const [showModalRol, setShowModalRol] = useState(false);

  const handleDepasUsers = () => {
    setDepasUsers(pDepas);
    setShowDepasUsers(true);
  };

  const handleShowRol = () => {
    setShowModalRol(true);
  };

  const changeRol = async () => {
    // Aquí agregarías la lógica para cambiar el rol

    const response = await fetch(apiUrl + `/api/panel/role/`, {
      method: "put",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("tk")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idUser: pId,
        newRole: rolSelect,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      setShowModalRol(false);
      console.log(data);
    }
  };

  const handleRolChange = (e) => {
    setRolSelect(e.target.value); // Actualiza el rol seleccionado
  };

  const getAvailableRoles = () => {
    const roles = ["user", "admin", "moderator"];
    return roles.filter((role) => role !== pRolName); // Devuelve los roles que no son el rol actual
  };
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const deleteUser = async () => {
    const response = await fetch(apiUrl + `/api/panel/user/${pId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("tk")}`,
        "Content-Type": "application/json",
      }
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setShowModalDeleteUser(false)
    }
  };
  return (
    <div className="CardAdmPanel">
      <AlertModal
        show={showModalDeleteUser}
        ctrlModal={setShowModalDeleteUser}
        funMain={deleteUser}
        nameDepa={pNombre + " " + pApellido}
      />
      {showModalRol ? (
        <div className="Modal_change_rol">
          <div className="Modal_box">
            <div className="Modal_header">
              <button
                onClick={() => {
                  setShowModalRol(false);
                }}
              >
                X
              </button>
              <h3>Cambiar Rol</h3>
            </div>

            <select value={rolSelect} onChange={handleRolChange}>
              {getAvailableRoles().map((role) => (
                <option key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </option>
              ))}
            </select>

            <h4>
              El Rol cambiará de: {pRolName} a {rolSelect}
            </h4>
            <button className="Modal_box_btn_change" onClick={changeRol}>
              Aceptar
            </button>
          </div>
        </div>
      ) : null}

      <div className="CardAdmPanel_box_content">
        <div className="CardAdmPanel_box_infouser">
          <h3>{pNombre + " " + pApellido}</h3>
          <h4>{"Email: " + pEmail}</h4>
          <p>{"Cantidad de Publicaciones: " + pDepas.length}</p>
          <p>{"Rol: " + rolSelect}</p>
        </div>
        <div className="CardAdmPanel_box_btnopt">
          <button
            className="Panel_btn_delete"
            onClick={() => {
              setShowModalDeleteUser(true);
            }}
          >
            Eliminar
          </button>
          <button className="Panel_btn_viewpubli" onClick={handleDepasUsers}>
            Ver Publicaciones
          </button>
          <button className="Panel_btn_configRoles" onClick={handleShowRol}>
            Cambiar Permisos
          </button>
        </div>
        <div className="CardAdmPanel_box_depasusers">
          <ul>
            {showDepasUsers
              ? depasUsurs.map((e, index) => (
                  <li key={e}>
                    <Link to={`/react-depas/depa/${e}`}>{e}</Link>
                  </li>
                ))
              : null}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CardAdmPanel;
