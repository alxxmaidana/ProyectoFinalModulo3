import { Router } from 'express';

const countriesRouter = Router();

import {
	verificarSiExisteElPais,
	getDatosFormulario,
	getPaisPorId, 
	getTodosLosPaises
 } from '../controllers/countriesController.js';

countriesRouter.get('/', getTodosLosPaises);

// Ruta para obtener el documento pora formulario
countriesRouter.get('/formData', getDatosFormulario)

// Buscar país por id
countriesRouter.get('/:id/buscar', getPaisPorId);

export default countriesRouter;
