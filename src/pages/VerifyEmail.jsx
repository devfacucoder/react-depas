import "./pages.css";
import { useEffect, useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_URL_API;

function VerifyEmail() {
    const location = useLocation()
    const navi = useNavigate();
    const emailData = location.state?.emailData || null
    const [codeInp,setCodeInp] = useState("")
    const sendVerification = (e)=>{
      e.preventDefault();

      fetch(apiUrl + `/api/auth/verifyemail`,{
        method:"POST",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("tk")}`,
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
          code:codeInp
        })
      }).then((res)=>{
        if(res.status==201){
          console.log("el correo fue verificado")
          navi("/react-depas/perfil")
        }
        res.json()
      })
      .then((data)=>{
        console.log(data)
      })
      .catch((err)=>{
        console.log(err)
      })


    }
  return (
    <div className="VerifyEmail">
      <div className="box_form_VerifyEmail">
        <h2>Se ha enviado un mail a tu correo: { emailData }</h2>
        <form action="" onSubmit={sendVerification}>
          <input type="number" onChange={(e)=>{
            
            setCodeInp(e.target.value)
          }} required/>
          <button>Verificar</button>
        </form>
        <button className="verifyEmail_btn_cambiar">
            Cambiar Correo
        </button>
      </div>
    </div>
  );
}

export default VerifyEmail;
