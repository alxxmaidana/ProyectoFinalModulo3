import { body } from 'express-validator';

// Midleware de validación para los campos del formulario de agregar y editar países
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
	// Validar URL de la bandera
	body('bandera').trim().notEmpty().withMessage('Elija la bandera del país'),

	////////////
	// Capital
	////////////
	body('capital.*') // Eliminar espacios en blanco de cada capital
		.trim(),
	body('capital')
		// Que el array capital no esté vacío
		.isArray({ min: 1 })
		.withMessage('Ingrese la capital del país')
		.bail()
		// Cada capitlal tenga alménos 3 caracteres
		.custom((capitales) => {
			// Validar que tenga almenos 3 caractéres
			if (capitales.some((capital) => capital.length < 3)) {
				throw new Error('Cada capital debe tener almenos 3 caractéres');
			}
			// Que tenga cómo máximo 90 caractéres
			if (capitales.some((capital) => capital.length > 90)) {
				throw new Error('Cada capital no puede superar los 90 caractéres');
			}
			// No contenga números ni caractéres especiales
			const regex = /^[a-zA-ZÀ-ÿ\s,']+$/;
			if (capitales.some((capital) => !regex.test(capital))) {
				throw new Error(
					'La capital no puede contener números ni caractéres especiales',
				);
			}
			return true;
			// Con some validamos que alménos un elemento del array no cumpla la condicion
		}),
	/////////////////////
	// Subregión
	//////////////////
	body('subregion')
		.trim()
		// Subregión obligatória
		.notEmpty()
		.withMessage('Elija la subregión del país'),
	////////////////////////
	// Fronteras
	////////////////////////
	body('frontereas.*').trim(),
	// Validar que todos los países sean solo letras
	body('fronteras')
		// Si el campo está vacío no valida
		.custom((fronteras) => {
			if (fronteras.length > 0) {
				// Que solo contenga letras
				if (fronteras.some((pais) => !pais.match(/^[A-Za-z\s]+$/))) {
					throw new Error('Cada país debe contener sólo letras');
				}
				// Que esté en mayùsculas
				if (fronteras.some((frontera) => frontera !== frontera.toUpperCase())) {
					throw new Error(
						'El código de cada frontera deber estar en mayúsculas',
					);
				}
				// Que tenga exactamente 3 carácteres
				if (fronteras.some((pais) => pais.length !== 3)) {
					throw new Error(
						'El código de cada país debe tener exactamente 3 caracteres',
					);
				}
			}
			return true;
		}),

	//////////////////////
	// Área
	/////////////////////
	body('area')
		.trim()
		.notEmpty()
		.withMessage('El área del país es obligatório')
		.bail()
		// Si Es un número
		.isNumeric()
		.withMessage('El área del país debe ser un número')
		.bail()
		//  Que no sea negativo
		.custom((value) => {
			if (Number(value) <= 0) {
				throw new Error('El area debe ser un número mayor 0 (cero)');
			}
			return true;
		}),

	////////////////////
	// Población
	////////////////////
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

	///////////////////////
	// Zonas horárias
	///////////////////////
	body('zonasHorarias.*').trim(),
	body('zonasHorarias')
		// Verificar que tenga almenos una zona horaria
		.isArray({ min: 1 })
		.withMessage('Elija almenos una zona horária'),

	//////////////////////
	// Monedas
	//////////////////////
	body('moneda.simbolo')
		.trim()
		.notEmpty()
		.withMessage('El símbolo de la moneda es requerido')
		.bail()
		// Que sea un string
		.isString()
		.withMessage('El símbolo de la moneda debe ser un texto')
		.bail()
		// Que tenga cómo máximo 5 carácteres
		.isLength({ max: 5 })
		.withMessage('El símbolo no puede superar los 5 caracteres'),
	body('moneda.nombre')
		.trim()
		.notEmpty()
		.withMessage('El nombre de la moneda es requerido')
		.bail()
		// Que se texto
		.custom((nombreMoneda) => {
			const regex = /^[a-zA-ZÀ-ÿ\s,']+$/;
			if (!regex.test(nombreMoneda)) {
				throw new Error(
					'El nombre de la moneda no puede contener número y caractéres especiales',
				);
			}
			return true;
		})
		.bail()
		// Que tenga cómo minimo 3 caracteres y máximo 40
		.isLength({ min: 3, max: 40 })
		.withMessage('El nombre debe tener entre 3 y 40 caracteres'),

	// body('latitudLongitud')
	//     .isArray({ min: 1 }).withMessage('Ingreser por favor la Latitud y Longitud')
	//     .bail()
	//     .custom((latitudLongitud) => {
	//         const latitud = latitudLongitud[0];
	//         const longitud = latitudLongitud[1];
	//         console.log(latitud, longitud);
	//         const envioLatitud = if (latitud)
	//     })

	//     ,

	//////////////////////////////
	// Indice de Gini
	////////////////////////////
	body('indiceGini').custom((indiceGini) => {
		// Si no existe el objeto completo, no valida nada
		if (!indiceGini) return true;
		const { valor, anio } = indiceGini;
		// Si se envía uno solo, exigir ambos
		const envioValor = valor !== undefined && valor !== '';
		const envioAnio = anio !== undefined && anio !== '';

		if (envioValor || envioAnio) {
			if (!envioValor || !envioAnio) {
				throw new Error(
					'Si se envía el índice de Gini, ambos campos (valor y anio) son obligatorios',
				);
			}
		}
		return true;
	}),
	// Valor índice Gini
	body('indiceGini.valor')
		// Si el valor es falsy (null, undefined, "") no se valida, pero si se envía algo que no es falsy se valida
		.optional({ values: 'falsy' })
		// Es un número flotante entre 0 y 100
		.isFloat({ min: 0, max: 100 })
		.withMessage('El índice de Gini debe ser un número entre 0 y 100'),

	// Año medición
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
