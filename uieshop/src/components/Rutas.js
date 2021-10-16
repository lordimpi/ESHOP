import { Switch, Route } from "react-router-dom";
import Inicio from "../views/Inicio.js";

const Rutas = () => {
    return (
        <Switch>
            <Route exact path="/" component={Inicio} />
        </Switch>
    )
}

export default Rutas;