import "./pages.css";
import CardDepa from "../components/CardDepa";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const apiUrl = import.meta.env.VITE_URL_API;

function Inicio() {
  const [stateDepa, setStateDepa] = useState([]); // Estado para almacenar departamentos
  const [originalDepas, setOriginalDepas] = useState([]); // Estado para mantener el valor inicial
  const [optBuscar, setOptBuscar] = useState(""); // Estado para manejar la opción de búsqueda

  // Función para manejar la búsqueda
  const buscar = async (e) => {
    e.preventDefault();
    const response = await fetch(
      apiUrl + `/api/depa/buscar?location=${optBuscar}`
    );
    const data = await response.json();
    setStateDepa(data); // Actualiza con los resultados de la búsqueda
  };

  // useEffect para cargar los departamentos al montar el componente
  useEffect(() => {
    fetch(apiUrl + `/api/depa`)
      .then((res) => res.json())
      .then((data) => {
        setStateDepa(data.depas); // Cargar los departamentos en el estado
        setOriginalDepas(data.depas); // Guardar una copia de los departamentos originales
      });
  }, []); // Ejecuta solo una vez al montar el componente

  return (
    <div className="Inicio">
      <div className="Inicio_item">
        <h2>Buscar Por Departamento</h2>
        <form onSubmit={buscar} action="">
          <select
            name=""
            id=""
            onChange={(e) => {
              setOptBuscar(e.target.value); // Actualizar la opción seleccionada
            }}
          >
            <option value="">Seleccione una ubicación</option>
            <option value="Chimbas">Chimbas</option>
            <option value="Rawson">Rawson</option>
            <option value="Rivadavias">Rivadavias</option>
            <option value="Capital">Capital</option>
          </select>
          <button>Buscar</button>
        </form>
      </div>
      <div className="Inicio_list">
        <ul>
          {stateDepa.length > 0 ? (
            stateDepa.map((e, index) => (
              <li key={index}>
                <Link to={`/depa/${e._id}`}>
                  <CardDepa
                    imgUrl={e.imgs}
                    precio={e.price}
                    location={e.location}
                    title={e.title}
                  />
                </Link>
              </li>
            ))
          ) : (
            <p>No hay resultados</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Inicio;
