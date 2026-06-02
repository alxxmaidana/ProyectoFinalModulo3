import path from 'node:path';
import dotenv from 'dotenv';
import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import methodOverride from 'method-override';
import countriesRouter from './routes/countriesRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Configurar motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
app.set('layout', 'layout');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.resolve('./public'))); // Servir cualquier archivo estático dentro de public
app.use(expressLayouts);

// Redireccionar a '/GeoPanel' que es donde estan definidas las rutas
app.get('/', (_req, res) => {
	res.redirect('/GeoPanel');
});

// Montar el  enrutador utilizando en el prefijo en la variable global appPrefix
app.use('/GeoPanel', countriesRouter);

// Mensaje para rutas no encontrada para el codigo de estado 404
app.use((_req, res) => {
	res.status(404).json({ message: 'Ruta no encontrada' });
});

export { app, port };
