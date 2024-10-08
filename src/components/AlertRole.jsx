import "./components.css";
import { useNavigate } from "react-router-dom";
function AlerRole({ show=false }) {
    const navi = useNavigate()
  if (show) {
    setTimeout(()=>{
        navi("/auth/login")
    },2000)
    return (
      <div className="AlertModal">
        <div className="Modal"><h1>No eres Admin Para Estar aca</h1></div>
      </div>
    );
  } else {
    return <></>;
  }
}

export default AlerRole;
