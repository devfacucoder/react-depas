import "./App.css";
import { useState } from "react";
import Auth from "./pages/Auth";
import Perfil from "./pages/Perfil";
import CreateArti from "./pages/CreateArti";
import Depa from "./pages/Depa";
import MenuNav from "./components/MenuNav";
import Inicio from "./pages/Inicio";
import Panel from "./pages/Panel";
import { Route, Routes } from "react-router-dom";
import { FaBars } from "react-icons/fa";



import ScrollToTop from "./components/ScrollToTop";
function App() {
  const [count, setCount] = useState(0);
  const [showMenuNav,setShowMenuNav] = useState(false)
  return (
    <div className="App">
      <MenuNav stt={showMenuNav} fun={setShowMenuNav}/>
      <header>
        <button className="icons_bars_header" onClick={()=>{
          setShowMenuNav(true)
        }}>
          <FaBars  />
        </button>
        <h1>Alqui San Juan</h1>
      </header>
      <ScrollToTop  />
      <Routes>
      <Route path="/" element={<Inicio />} />

        <Route path="/panel" element={<Panel/>} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/auth/login" element={<Auth />} />
        <Route path="/auth/register" element={<Auth />} />
        <Route path="/perfil" element={<Perfil />} />

        <Route path="/creardepa" element={<CreateArti mode="crear" />} />
        <Route path="/depa/:id" element={<Depa />} />
        <Route path="/editar/:id" element={<CreateArti mode="edit" />} />
      </Routes>
    </div>
  );
}

export default App;
