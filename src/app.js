import express from "express";
import morgan from "morgan";
import config from "./config.js";
import productos from "./modulos/productos/rutas.js";
import usuarios from "./modulos/usuarios/rutas.js";
import { errors } from "./red/errors.js";
const app = express();

//Middleware para setear rutas
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuracion de los puertos y despliegue
app.set("port", config.app.port);

/* Rutas */
app.use("/api/productos", productos);
app.use("/api/usuarios", usuarios);
app.use(errors);
export default app;
