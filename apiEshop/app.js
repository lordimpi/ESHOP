//Cargar la libreria o modulo express
const express = require('express');
const app = express();
const puerto = 3011;

app.get("/", (req, res) => {
    res.send('Servicio de BD ESHOP en funcionamiento');
}
);

//Cargar libreria para "Parseo" de contenido JSON
var bodyParser = require('body-parser');
app.use(bodyParser.json());

//Cargar libreria para habilitar cors
const cors = require('cors')
app.use(cors())


require("./routes/producto.rutas")(app);

//Iniciar el servicio
app.listen(puerto, () => {
    console.log("Servicio disponble en la url: http://localhost:" + puerto);
});
