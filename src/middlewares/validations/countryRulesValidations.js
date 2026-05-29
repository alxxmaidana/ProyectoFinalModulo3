import { body } from 'express-validator';

const validarPaises = [
	// Nombre común
	body('nombre.comun')
		// Eliminar los espacios el blanco al inicio y final
		.trim()
		// Validar que campo no esté vació
		.notEmpty()
		.withMessage('Ingrese el nombre común del país')
		// bail() -> Detiene la ejecución de la cadena de validaciones si la validación falló
		.bail()
		// Que tenga un mínimo de 3 caractéres
		.isLength({ min: 3 })
		.withMessage('El nombre común debe tener almenos de 3 caractéres')
		.bail()
		// Que tenga un máximo de 90 caractéres
		.isLength({ max: 90 })
		.withMessage('El nombre común no puede superar los 90 caractéres')
		// Validar que no contenga número ni caractéres especiales
		.custom((nombreComun) => {
			const regex = /^[a-zA-ZÀ-ÿ\s,']+$/;
			if (!regex.test(nombreComun)) {
				throw new Error(
					'El nombre común del país no puede contener números ni carácteres especiales',
				);
			}
			return true;
		}),
	// Nombre oficial
	body('nombre.oficial')
		.trim()
		.notEmpty()
		.withMessage('Ingrese el nombre oficial del país')
		.bail()
		.isLength({ min: 3 })
		.withMessage('El nombre oficial debe tener almenos de 3 caractéres')
		.bail()
		.isLength({ max: 90 })
		.withMessage('El nombre oficial no puede superar los 90 caractéres')
		.bail()
		.custom((nombreOficial) => {
			const regex = /^[a-zA-ZÀ-ÿ\s,']+$/;
			if (!regex.test(nombreOficial)) {
				throw new Error(
					'El nombre oficial del país no puede contener números ni caractéres especiales',
				);
			}
			return true;
		}),
	body('bandera').trim().notEmpty().withMessage('Elija la bandera del país'),

	body('capital.*').trim(),
	body('capital')
		.isArray({ min: 1 })
		.withMessage('Ingrese la capital del país')
		.bail()
		.custom((capitales) => {
			// validar que cada capital tenga elmenos 3 caracteres
			if (capitales.some((capital) => capital.length < 3)) {
				throw new Error('Cada capital debe tener almenos 3 caractéres');
			}
			// que cada capital tenga como máximo 90 caractéres
			if (capitales.some((capital) => capital.length > 90)) {
				throw new Error('Cada capital no puede superar los 90 caractéres');
			}
			// No contengan números ni caractéres especiales
			const regex = /^[a-zA-ZÀ-ÿ\s,']+$/;
			if (capitales.some((capital) => !regex.test(capital))) {
				throw new Error(
					'La capital no puede contener números ni caractéres especiales',
				);
			}
			return true;
		}),

	body('subregion')
		.trim()
		.notEmpty()
		.withMessage('Elija la subregión del país'),

	body('frontereas.*').trim(),
	body('fronteras').custom((fronteras) => {
		// Fronteras es opcional, si no se ingreso ninguna, se salta la validación
		if (fronteras.length > 0) {
			// Que solo contengan letras
			if (fronteras.some((pais) => !pais.match(/^[A-Za-z\s]+$/))) {
				throw new Error('Cada país debe contener sólo letras');
			}
			// Que estén en mayúsculas
			if (fronteras.some((frontera) => frontera !== frontera.toUpperCase())) {
				throw new Error('El código de cada frontera deber estar en mayúsculas');
			}
			// Que tengan exactamente 3 carácteres
			if (fronteras.some((pais) => pais.length !== 3)) {
				throw new Error(
					'El código de cada país debe tener exactamente 3 caracteres',
				);
			}
		}
		return true;
	}),

	body('area')
		.trim()
		.notEmpty()
		.withMessage('El área del país es obligatório')
		.bail()
		// Si Es un número
		.isNumeric()
		.withMessage('El área del país debe ser un número')
		.bail()
		// Que no sea negativo
		.custom((value) => {
			if (Number(value) <= 0) {
				throw new Error('El area debe ser un número mayor 0 (cero)');
			}
			return true;
		}),

	body('poblacion')
		.trim()
		.notEmpty()
		.withMessage('Ingrese la cantidad de habitantes')
		.bail()
		.isNumeric()
		.withMessage('La cantidad de habitantes debe ser un número entero')
		.isInt({ min: 1 })
		.withMessage(
			'La cantidad de habitantes debe ser un número entero positivo (mayor a cero)',
		),

	body('zonasHorarias.*').trim(),
	body('zonasHorarias')
		.isArray({ min: 1 })
		.withMessage('Elija almenos una zona horária'),

	body('moneda.simbolo')
		.trim()
		.notEmpty()
		.withMessage('El símbolo de la moneda es requerido')
		.bail()
		.isString()
		.withMessage('El símbolo de la moneda debe ser un texto')
		.bail()
		.isLength({ max: 5 })
		.withMessage('El símbolo no puede superar los 5 caracteres'),
	body('moneda.nombre')
		.trim()
		.notEmpty()
		.withMessage('El nombre de la moneda es requerido')
		.bail()
		// Que el nombre de la moneda no contenga números ni caracteres especiales
		.custom((nombreMoneda) => {
			const regex = /^[a-zA-ZÀ-ÿ\s,']+$/;
			if (!regex.test(nombreMoneda)) {
				throw new Error(
					'El nombre de la moneda no puede contener números y caractéres especiales',
				);
			}
			return true;
		})
		.bail()
		.isLength({ min: 3, max: 40 })
		.withMessage('El nombre debe tener entre 3 y 40 caracteres'),

	body('independiente')
		.notEmpty()
		.withMessage('Indique si es independiente o no'),

	body('miemboONU')
		.notEmpty()
		.withMessage('Indique si es o no miembro de la ONU'),

	body('salidaAlMar')
		.notEmpty()
		.withMessage('Inique si el país tiene o no salida al Mar'),

	body('fifa')
		.optional()
		.trim()
		.custom((fifa) => {
			// Validar que el códifo fifa no tenga, número ni caractéres especiales
			const regex = /^[a-zA-ZÀ-ÿ\s,']+$/;
			if (!regex.test(fifa)) {
				throw new Error(
					'El código FIFA no puede contener números ni caractéres especiales',
				);
			}
			return true;
		})
		.bail()
		.custom((fifa) => {
			if (fifa !== fifa.toUpperCase()) {
				throw new Error('El código FIFA  deber estár en mayúsculas');
			}
			return true;
		})
		.bail()
		.custom((fifa) => {
			if (fifa.length !== 3) {
				throw new Error('El código FIFA debe tener exáctamente 3 caracteres');
			}
			return true;
		}),

	body('coordenadas.latitud')
		.trim()
		.notEmpty()
		.withMessage('Ingrese la latitud')
		.bail()
		.isFloat({ min: -90, max: 90 })
		.withMessage('La latitud debe ser un número entr -90 y 90'),
	body('coordenadas.longitud')
		.trim()
		.notEmpty()
		.withMessage('Ingrese la longitud')
		.bail()
		.isFloat({ min: -180, max: 180 })
		.withMessage('La longitud debe ser un número entre -180 y 180'),

	body('indiceGini').custom((indiceGini) => {
		// Si no se manda el objeto, no se valida
		if (!indiceGini) return true;
		const { valor, anio } = indiceGini;
		const envioValor = valor !== undefined && valor !== '';
		const envioAnio = anio !== undefined && anio !== '';
		// Si se envía uno solo, exigir ambos
		if (envioValor || envioAnio) {
			if (!envioValor || !envioAnio) {
				throw new Error(
					'Si se envía el índice de Gini, ambos campos (valor y anio) son obligatorios',
				);
			}
		}
		return true;
	}),
	body('indiceGini.valor')
		// Si el valor es falsy (null, undefined, "") no se valida, pero si se envía algo que no es falsy se valida
		.optional({ values: 'falsy' })
		// Es un número flotante entre 0 y 100
		.isFloat({ min: 0, max: 100 })
		.withMessage('El índice de Gini debe ser un número entre 0 y 100'),
	body('indiceGini.anio')
		// Si el año es falsy (null, undefined, "") no se valida, pero si se envía algo que no es falsy se valida
		.optional({ values: 'falsy' })
		// Validar que se un número entero entre 1912 y el año actual
		.isInt({ min: 1912, max: new Date().getFullYear() })
		.withMessage(
			`El año de medición del índice de Gini debe ser un número entero entre 1912 y ${new Date().getFullYear()}`,
		),
];

export default validarPaises;
