import { Router } from 'express';

const countriesRouter = Router();

import {
	deletePais,
	getDashboard,
	getDatosFormulario,
	getPaisPorId,
	postPais,
	putPais,
} from '../controllers/countriesController.js';

import validarPaises from '../middlewares/validations/countryRulesValidations.js';
import manejarErroresValidacion from '../middlewares/validations/handleValidationsErrors.js';

// Renderizar el Dashobard con la tabla de países
countriesRouter.get('/', getDashboard);

// Ruta para obtener el documento pora formulario
countriesRouter.get('/formData', getDatosFormulario);

// Buscar país por id
countriesRouter.get('/:id/buscar', getPaisPorId);

countriesRouter.post(
	'/crear',
	validarPaises,
	manejarErroresValidacion,
	postPais,
);

countriesRouter.put(
	'/:id/editar',
	validarPaises,
	manejarErroresValidacion,
	putPais,
);

countriesRouter.delete('/:id/eliminar', deletePais);

export default countriesRouter;
