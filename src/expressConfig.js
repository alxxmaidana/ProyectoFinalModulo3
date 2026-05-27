// Configurción de express, middlewares, y montar enrutadores
import dotenv from 'dotenv';
import express from 'express';
import methodOverride from 'method-override';
import countriesRouter from './routes/countriesRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));



// Redireccionar a '/paises' que es donde tengo las rutas
app.get('/', (_req, res) => {
	res.redirect('/countries');
});

// Montar enrutador
app.use('/countries', countriesRouter);

// Mensaje para rutas no encontrada para el codigo de estado 404
app.use((_req, res) => {
	res.status(404).json({ message: 'Ruta no encontrada' });
});

export { app, port };
