import { BrowserRouter } from "react-router-dom";
import MenuPrincipal from "./components/MenuPrincipal";
import Rutas from "./components/Rutas";

function App() {
  return (
    <BrowserRouter>
      <MenuPrincipal />
      <Rutas />
    </BrowserRouter>
  );
}

export default App;
