import { Router } from 'express';

const countriesRouter = Router();

import {
	deletePais,
	getDatosFormulario,
	getPaisPorId,
	getTodosLosPaises,
	postPais,
	putPais,
} from '../controllers/countriesController.js';

countriesRouter.get('/', getTodosLosPaises);

// Ruta para obtener el documento pora formulario
countriesRouter.get('/formData', getDatosFormulario);

// Buscar país por id
countriesRouter.get('/:id/buscar', getPaisPorId);

countriesRouter.post('/crear', postPais);

countriesRouter.put('/:id/editar', putPais);

countriesRouter.delete('/:id/eliminar', deletePais);

export default countriesRouter;
