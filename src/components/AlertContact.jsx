import "./components.css";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
function AlerContact({ show = false, ctrlModal,numberContact,emaiLAuthor }) {
  if (show) {
    return (
      <div className="AlertModal">
        <div className="Modal">
          <div className="header_modal">
            <button
              onClick={() => {
                ctrlModal(false);
              }}
            >
              X
            </button>
          </div>
          <div className="Modal_contact">

          <h3><MdEmail/>{emaiLAuthor}</h3>
          <h3><FaPhoneAlt/> {numberContact}</h3>
          </div>

        </div>
      </div>
    );
  } else {
    return <></>;
  }
}

export default AlerContact;
