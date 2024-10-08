import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation(); // Accede a la ruta actual

  useEffect(() => {
    window.scrollTo(0, 0); // Desplaza hacia el inicio cada vez que cambia la ruta
  }, [pathname]);

  return null; // Este componente no necesita renderizar nada
}

export default ScrollToTop; 