import { BrowserRouter } from "react-router-dom";
import MenuPrincipal from "./components/MenuPrincipal";
import Rutas from "./components/Rutas";
import { Auth0Provider } from "@auth0/auth0-react";

function App() {
  return (

    <Auth0Provider
      domain="eshop1.us.auth0.com"
      clientId="heiyn1tvgCgiBMogkzMZtsozuOmcYD66"
      redirectUri={window.location.origin}
    >
      <BrowserRouter>
        <MenuPrincipal />
        <Rutas />
      </BrowserRouter>
    </Auth0Provider>

  );
}

export default App;
