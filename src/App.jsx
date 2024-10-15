import "./App.css";
import { useState } from "react";
import Auth from "./pages/Auth";
import Perfil from "./pages/Perfil";
import CreateArti from "./pages/CreateArti";
import Depa from "./pages/Depa";
import MenuNav from "./components/MenuNav";
import Inicio from "./pages/Inicio";
import Panel from "./pages/Panel";
import VerifyEmail from "./pages/VerifyEmail";


import { Route, Routes } from "react-router-dom";
import { FaBars } from "react-icons/fa";

import ScrollToTop from "./components/ScrollToTop";
function App() {
  const [count, setCount] = useState(0);
  const [showMenuNav, setShowMenuNav] = useState(false);
  return (
    <div className="App">
      <MenuNav stt={showMenuNav} fun={setShowMenuNav} />
      <header>
        <button
          className="icons_bars_header"
          onClick={() => {
            setShowMenuNav(true);
          }}
        >
          <FaBars />
        </button>
        <h1>Alqui San Juan</h1>
      </header>
      <ScrollToTop />
      <Routes>
        <Route path="/react-depas" element={<Inicio />} />

        <Route path="/react-depas/panel" element={<Panel />} />
        <Route path="/react-depas/auth" element={<Auth />} />
        <Route path="/react-depas/auth/login" element={<Auth />} />
        <Route path="/react-depas/auth/register" element={<Auth />} />
        <Route path="/react-depas/verify" element={<VerifyEmail/>}/>
        <Route path="/react-depas/perfil" element={<Perfil />} />

        <Route path="/react-depas/creardepa" element={<CreateArti mode="crear" />} />
        <Route path="/react-depas/depa/:id" element={<Depa />} />
        <Route path="/react-depas/editar/:id" element={<CreateArti mode="edit" />} />
        
      </Routes>
     
    </div>
  );
}
/* 

*/
export default App;
