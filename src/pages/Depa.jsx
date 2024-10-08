import "./pages.css";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useCrudDepa from "../hooks/useCrudDepa";

import AlertModal from "../components/AlertModal";
import AlerContact from "../components/AlertContact";
const apiUrl = import.meta.env.VITE_URL_API;

function Depa() {
  const navi = useNavigate();
  const [inImg, setInImg] = useState(0);
  const { id } = useParams();
  const location = useLocation();
  const depaData = location.state?.depaData || null;
  const author = location.state?.userName || null;
  const [showModaDelete, setShowModalDelete] = useState(false);
  const [showModaContact, setShowModaContact] = useState(false);
  const { deleteDepa } = useCrudDepa();
  const [stateAuthor, setStateAuthor] = useState(null);
  const [stateDepa, setStateDepa] = useState(null);
  const handleImgs = (dire) => {
    if (dire == "lf" && inImg > 0) {
      setInImg(inImg - 1);
    } else if (dire == "rt" && inImg < stateDepa.imgs.length - 1) {
      setInImg(inImg + 1);
    }
  };

  const handleDeleteDepa = async () => {
    const result = await deleteDepa(id);

    if (result.status == 200) {
      navi("/perfil");
    } else {
      console.error("Error al eliminar el departamento:", result);
    }
  };

  useEffect(() => {
    if (depaData) {
      setStateDepa(depaData);
    } else {
      fetch(apiUrl + "/api/depa/" + id)
        .then((res) => res.json())
        .then((res) => setStateDepa(res.depa))
        .catch((err) => console.log(err));
    }
  }, []);
  useEffect(() => {
    if (author) {
      setStateAuthor(author);
    } else if (stateDepa) {
      fetch(apiUrl + "/api/users/" + stateDepa.author)
        .then((res) => res.json())
        .then((res) => setStateAuthor(res))
        .catch((err) => console.log(err));
    }
  }, [stateDepa]);
  return (
    <div className="Depa">
      <AlertModal
        nameDepa={stateDepa ? stateDepa.title : "esta Publicacion"}
        show={showModaDelete}
        funMain={handleDeleteDepa}
        id={id}
        ctrlModal={setShowModalDelete}
      />
      <AlerContact
        show={showModaContact}
        ctrlModal={setShowModaContact}
        emaiLAuthor={stateAuthor ? stateAuthor.email : "lol"}
        numberContact={stateDepa ? stateDepa.contactNumber : "lol"}
      />
      <div className="Depa_presen">
        <div className="Depa_box_imgs">
          <img
            src={
              stateDepa &&
              stateDepa.imgs &&
              stateDepa.imgs.length > 0 &&
              stateDepa.imgs[inImg]
                ? stateDepa.imgs[inImg].url
                : "https://i.pinimg.com/736x/28/78/5e/28785e0fb4653060408fa2eda6309aed.jpg"
            }
            alt="Imagen del departamento"
          />
          <button onClick={() => handleImgs("lf")} className="btn_imgs lf">
            <GrFormPrevious />
          </button>
          <button onClick={() => handleImgs("rt")} className="btn_imgs rt">
            <GrFormNext />
          </button>
        </div>
        <div className="Depa_opts">
          <h3>{stateDepa ? stateDepa.title : "locading..."}</h3>
          <p className="Depa_opts_location">{stateDepa ? stateDepa.location : "Loading..."}</p>
          <h3>
            {stateDepa
              ? stateDepa.price + " " + stateDepa.currency + "/Mes"
              : "locading..."}
          </h3>

          <div className="Depa_opts_btns">
            <button
              className="btn_delete"
              onClick={() => {
                setShowModalDelete(true);
              }}
            >
              Borrar
            </button>
              <button onClick={()=>{
                navi(`/editar/${id}`,{
                  state:{
                    dateForEdit:stateDepa
                  }
                })
              }}>
                Editar
              </button>
            <button
              className="btn_contact"
              onClick={() => {
                setShowModaContact(true);
              }}
            >
              Ver Contacto
            </button>
          </div>
          <div className="Depa_opts_features">
            <h3>Características</h3>
            <div>
              {stateDepa
                ? stateDepa.features.map((e, index) => <p>{e}</p>)
                : null}
            </div>
          </div>
          <div className="box_Descripcion">
            <h3>Descripcion</h3>
            <p>{<p>{stateDepa ? stateDepa.description : "locading..."}</p>}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
/*
 <button
            onClick={() => {
              setShowModalDelete(true);
            }}
          >
            Borrar
          </button>
          <p>
            {stateAuthor
              ? stateAuthor.firtsName + " " + stateAuthor.lastName
              : "loading..."}
          </p>
          <h3>{stateDepa ? stateDepa.title : "locading..."}</h3>
          <p>{stateDepa ? stateDepa.price : "loading..."}</p>{" "}
          <b>{stateDepa ? stateDepa.currency : "USD"}</b>
*/
//"https://i.pinimg.com/564x/49/ae/24/49ae24d0acb588d7bb21ae6821201edd.jpg"
export default Depa;
