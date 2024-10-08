import "./pages.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaExchangeAlt } from "react-icons/fa";
const apiUrl = import.meta.env.VITE_URL_API;
function CreateArti({ mode = "crear", ideForEdit }) {
  const localUrl = useLocation();
  const dateForEdit = localUrl.state?.dateForEdit || null;

  const refFiles = useRef(null);
  const refInptFeature = useRef(null);
  const refFileAdd = useRef(null)
  const [reTitle, setReTitle] = useState(
    mode == "edit" ? dateForEdit.title : ""
  );
  const [rePrice, setRePrice] = useState(
    mode == "edit" ? dateForEdit.price : ""
  );
  const [reContactNum, setReContactNum] = useState(
    mode == "edit" ? dateForEdit.contactNumber : ""
  );
  const [reConcurrency, setReConcurrency] = useState(
    mode == "edit" ? dateForEdit.currency : "ARS"
  );
  const [reLocation, setReLocation] = useState(
    mode == "edit" ? dateForEdit.location : "Chimbas"
  );

  const [inpFeature, setInpFeature] = useState("");
  const [reFeature, setReFeature] = useState(
    mode == "edit" ? dateForEdit.features : []
  );
  const [reDescription, setReDescription] = useState(
    mode == "edit" ? dateForEdit.description : null
  );
  const [imgForDelete, setImgForDelete] = useState([]);
  const removeItem = (indexToRemove) => {
    setReFeature((prevItems) =>
      prevItems.filter((_, index) => index !== indexToRemove)
    );
  };
  const newFeature = () => {
    if (inpFeature.length > 0) {
      setReFeature(reFeature.concat(inpFeature));
      refInptFeature.current.value = "";
    }
  };
  const navi = useNavigate();

  const newsImages = async (e)=>{
    const formData = new FormData();
    const filesImgs = refFileAdd.current.files;
    
    for (let i = 0; i < filesImgs.length; i++) {
      formData.append("imgs", filesImgs[i]);
    }
    const response = await fetch(apiUrl + "/api/depa", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("tk")}`,
        // NOTA: No es necesario establecer `Content-Type` aquí cuando usas FormData
      },
      body: formData, // Enviar el FormData en lugar de JSON.stringify
    });
    if (response.status == 200) {
      console.log("perfecto")
    }
  }


  const createArticulo = async (e) => {
    e.preventDefault();

    // Obtener los archivos seleccionados
    const filesImgs = refFiles.current.files;
    // Crear un objeto FormData para enviar archivos y otros datos
    const formData = new FormData();
    formData.append("title", reTitle);
    formData.append("price", rePrice);
    formData.append("contactNumber", reContactNum);
    formData.append("location", reLocation);
    formData.append("description", reDescription);
    formData.append("currency", reConcurrency);
    // Envía el array de features como JSON.stringify
    formData.append("features", JSON.stringify(reFeature)); // Convertir array a string JSON

    //formData.append("features", reFeature);
    // Agregar cada imagen al FormData
    for (let i = 0; i < filesImgs.length; i++) {
      formData.append("imgs", filesImgs[i]);
    }
    console.log(mode)
    // Realizar la solicitud POST con el FormData
    if ((mode = "crear")) {
      const response = await fetch(apiUrl + "/api/depa", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("tk")}`,
          // NOTA: No es necesario establecer `Content-Type` aquí cuando usas FormData
        },
        body: formData, // Enviar el FormData en lugar de JSON.stringify
      });
      if (response.status == 200) {
        const dataJs = await response.json();
        console.log(dataJs);

        navi(`/depa/${dataJs._id}`, {
          state: { depaData: dataJs },
        });
      }
    } else if ((mode = "edit")) {
      //TODO EDITAR ESTO
      const response = await fetch(apiUrl + `/api/depa/${ideForEdit}`, {
        method: "put",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("tk")}`,
          // NOTA: No es necesario establecer `Content-Type` aquí cuando usas FormData
        },
        body: formData, // Enviar el FormData en lugar de JSON.stringify
      });
    }
  };
  const deleteImages = (e, btn) => {
    const buttonElement = btn.currentTarget; // Aseguramos que obtenemos siempre el botón
    if (imgForDelete.includes(e)) {
      // Si el elemento ya está en el array, lo eliminamos
      setImgForDelete(imgForDelete.filter((item) => item !== e));
      buttonElement.style.backgroundColor = ""; // Restablecemos el fondo
    } else {
      // Si no está en el array, lo agregamos
      buttonElement.style.backgroundColor = "red"; // Cambiamos el fondo
      setImgForDelete([...imgForDelete, e]);
    }
  };
  const borrador = async () => {
    // Crea un array de promesas para las solicitudes de eliminación
    const promises = imgForDelete.map(async (img) => {
      const response = await fetch(apiUrl + `/api/imgs`, {
        method: "DELETE",
        body: JSON.stringify({
          imageId: img,
          depaId: dateForEdit._id,
        }),
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("tk")}`,
          "Content-Type": "application/json",
        },
      });

      // Comprueba si la respuesta es exitosa
      if (!response.ok) {
        throw new Error(`Error deleting image: ${response.statusText}`);
      }

      return img; // Devuelve el id de la imagen eliminada
    });

    try {
      // Espera a que todas las promesas se resuelvan
      const deletedImages = await Promise.all(promises);

      // Actualiza el array imgForDelete para eliminar las imágenes que han sido eliminadas
      setImgForDelete((prevImages) =>
        prevImages.filter((img) => !deletedImages.includes(img))
      );

      console.log("All images deleted successfully.");
    } catch (error) {
      console.error("Error occurred while deleting images:", error);
    }
  };
  const editArticulo = async (e) => {
    e.preventDefault();

    const bodyRequest = {};
    reTitle != dateForEdit.title ? (bodyRequest.title = reTitle) : null;
    reContactNum != dateForEdit.contactNumber
      ? (bodyRequest.contactNumber = reContactNum)
      : null;
    rePrice != dateForEdit.price ? (bodyRequest.price = rePrice) : null;
    reConcurrency != dateForEdit.currency
      ? (bodyRequest.currency = reConcurrency)
      : null;
    reLocation != dateForEdit.location
      ? (bodyRequest.location = reLocation)
      : null;
    reFeature != dateForEdit.features
      ? (bodyRequest.features = reFeature)
      : null; //TODO mejorar el feature para que no tenga que enviar cosas al pedo

    reDescription != dateForEdit.description
      ? (bodyRequest.description = reDescription)
      : null;

    console.log(dateForEdit._id);
    const response = await fetch(apiUrl + `/api/depa/${dateForEdit._id}`, {
      method: "PUT",
      body: JSON.stringify(bodyRequest),
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("tk")}`,
        "content-type": "application/json",
      },
    });
    for (const img of imgForDelete) {
      await fetch(apiUrl + `/api/imgs`, {
        method: "DELETE",
        body: JSON.stringify({
          imageId: img,
          depaId: dateForEdit._id,
        }),
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("tk")}`,
          "content-type": "application/json",
        },
      });
    }
    await borrador();
    await newsImages()
    if (response.status == 200) {
      const dataJs = await response.json();
      console.log(dataJs);

      navi(`/depa/${dataJs._id}`, {
        state: { depaData: dataJs },
      });
    }
  };

  useEffect(() => {
    if (mode == "edit") {
      setReFeature(dateForEdit.features);
    } else if (mode == "crear") {
      setReFeature([]);
      console.log(mode);
    }
  }, [mode]);

  return (
    <div className="CreateArti">
      <div className="box_create">
        <form
          onSubmit={mode == "crear" ? createArticulo : editArticulo}
          className="create_form"
        >
          <div className="create_item">
            <label htmlFor="inpTill">Titulo</label>
            <input
              onChange={(e) => setReTitle(e.target.value)}
              type="text"
              id="inpTill"
              value={reTitle}
            />
          </div>
          <div className="create_item">
            <label htmlFor="inpCon">Contacto</label>
            <input
              onChange={(e) => setReContactNum(e.target.value)}
              id="inpCon"
              type="text"
              value={reContactNum}
            />
          </div>
          <div className="create_item item_precio_moneda">
            <div className="item_precio">
              <label htmlFor="inpPrice">Precio</label>
              <input
                onChange={(e) => setRePrice(e.target.value)}
                id="inpPrice"
                type="number"
                value={rePrice}
              />
            </div>
            <div className="item_precio">
              {/*TODO editar esto causa */}
              <label htmlFor="">Moneda</label>
              <select
                name=""
                id=""
                onChange={(e) => {
                  setReConcurrency(e.target.value);
                }}
                value={reConcurrency}
              >
                <option value="ARS">ARS</option>
                <option value="USD">USD</option>
              </select>
            </div>
          </div>

          <div className="create_item">
            <label htmlFor="">Ubicacion</label>
            <select
              id=""
              value={"Chimbas"}
              onChange={(e) => setReLocation(e.target.value)}
            >
              <option value="Chimbas">Chimbas</option>
              <option value="Capital">Capital</option>
              <option value="Rawson">Rawson</option>
            </select>
          </div>
          <div className="create_item">
            <label htmlFor="inpEti">Etiquetas</label>
            <div className="box_claves">
              {reFeature.map((e, index) => (
                <span key={index}>
                  <div>
                    <b> {e} </b>
                    <button
                      type="button"
                      onClick={() => {
                        removeItem(index);
                      }}
                    >
                      X
                    </button>
                  </div>
                </span>
              ))}
            </div>
            <div className="item_etiqueta_opts">
              <input
                type="text"
                id="inpEti"
                ref={refInptFeature}
                onChange={(e) => setInpFeature(e.target.value)}
              />
              <button
                type="button"
                onClick={() => {
                  newFeature();
                }}
              >
                Agregar
              </button>
            </div>
          </div>
          {mode == "edit" ? (
            <div className="create_item">
              <ul>
                {dateForEdit.imgs.map((e, index) => (
                  <li className="edit_imgs" key={index}>
                    <div>
                      <button
                        onClick={(btn) => {
                          deleteImages(e.idkey, btn);
                        }}
                        type="button"
                        className="btn_delete_imgs"
                        id={e.idkey}
                      >
                        <MdDelete fontSize={"50px"} />
                      </button>
                    </div>
                    <img src={e.url} alt="" />
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="create_item">
              <input type="file" multiple ref={refFiles} />
            </div>
          )}
          {mode == "edit" ? (
            <div className="create_item">
              <input type="file" multiple ref={refFileAdd} />
            </div>
          ) : null}
          <div className="create_item">
            <label htmlFor="idInpDescripcion">Descripcion</label>
            <textarea
              name=""
              onChange={(e) => {
                setReDescription(e.target.value);
              }}
              id="idInpDescripcion"
            ></textarea>
          </div>

          <div className="create_item btn_submit_box">
            <input type="submit" value={mode == "edit" ? "Editar" : "Crear"} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateArti;
