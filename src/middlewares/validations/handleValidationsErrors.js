import { validationResult } from 'express-validator';

const manejarErroresValidacion = (req, res, next) => {
	const errores = validationResult(req);
	if (!errores.isEmpty()) {
		return res.status(400).json({
			mensaje: 'Error de validación',
			erroresValidacion: errores.array().map((error) => ({
				campo: error.param,
				mensajeCoreccion: error.msg,
			})),
		});
	}
	next();
};

export default manejarErroresValidacion;
