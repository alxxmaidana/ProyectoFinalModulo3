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
app.set('layout', './views/layouts/layout');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.resolve('./views/public'))); // Servir cualquier archivo estático dentro de public
app.use(expressLayouts);

// Redireccionar a '/paises' que es donde tengo las rutas
app.get('/', (_req, res) => {
	res.redirect('/paises');
});

// Montar enrutador
app.use('/paises', countriesRouter);

// Mensaje para rutas no encontrada para el codigo de estado 404
app.use((_req, res) => {
	res.status(404).json({ message: 'Ruta no encontrada' });
});

export { app, port };
