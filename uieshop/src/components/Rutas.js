import { Switch, Route } from "react-router-dom";
import Inicio from "../views/Inicio.js";
import Productos from "../views/Productos.js";

const Rutas = () => {
    return (
        <Switch>
            <Route exact path="/" component={Inicio} />
            <Route exact path="/productos" component={Productos} />
        </Switch>
    )
}

export default Rutas;