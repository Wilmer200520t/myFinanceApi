import express from 'express';
import config from './config.js';
import productos from './modulos/productos/rutas.js';

const app = express();

// Configuracion de los puertos y despliegue 
app.set('port', config.app.port) 

/* Rutas */
app.use('/api/productos', productos)

export default app ;