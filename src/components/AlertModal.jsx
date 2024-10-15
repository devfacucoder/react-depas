import "./components.css";
function AlertModal({
  nameDepa,
  funAgregadaALCancelar,
  show = false,
  funMain,
  id,
  ctrlModal,
}) {
  if (show) {
    document.body.style.overflow = "hidden";

    return (
      <div className="AlertModal">
        <div className="Modal">
          <h3>Estas Seguro que quieres eliminar a {nameDepa}</h3>
          <div className="btn_modal_box">
            <button
              onClick={() => {
                ctrlModal(false);
              }}
            >
              Cancelar
            </button>
            <button
              className="btn_modal_cancel"
              onClick={() => {
                funMain(id);
              }}
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    document.body.style.overflow = "auto";

    return <></>;
  }
}

export default AlertModal;
