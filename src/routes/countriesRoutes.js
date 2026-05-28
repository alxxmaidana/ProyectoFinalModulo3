import { Router } from 'express';

const countriesRouter = Router();

import { getTodosLosPaises } from '../controllers/countriesController.js';

// Ruta para probar si el servidor está funcionando
// countriesRouter.get('/', (_req, res) => {
// 	res.json({ message: 'Ruta funcionando' });
// });

// Definir rutas para los métodos crud simples, obtener, editar, crear y elminar
// Obtener todos los países
countriesRouter.get('/', getTodosLosPaises);

export default countriesRouter;
