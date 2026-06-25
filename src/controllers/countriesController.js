import {
	actualizarPais,
	buscarPorId,
	crearPais,
	eliminarPais,
	obtenerDocumentoDatosFormulario,
	obtenerTodosLosPaises,
	upsertPaisesHispanos,
	uspertDocumentoFormulario,
} from '../services/countriesService.js';

// Controlador del seed de países
export async function sembrarPaises(apiToken) {
	try {
		const response = await fetch(
			'https://api.restcountries.com/countries/v5?region=Americas&limit=100',
			{ headers: { 'Authorization': `Bearer ${apiToken}` } }
		);

		if (!response.ok) {
			throw new Error(`Error en la petición: ${response.status} - ${response.statusText}`)
		}

		const datos = await response.json()
		const paises = datos.data.objects;
		
		await uspertDocumentoFormulario(paises);
		console.log('Seed de documento para formulario realizada exitosamente');
		await upsertPaisesHispanos(paises);
		console.log('Seed de paises realizada exitosamente');
	
		
	} catch (error) {
		console.log('Error al sembrar los países en el controlador:', error);
	}
}

// Response renderizar dashboard
// 1. dasbhoard
// 2. title
// 3. paises
// 4. total area
// 5. total poblacion
// 6. promiedio gini
// 7. mensaje
// 8. tipo mensaje

// Response renderizar formulario crear
// 1. formulario
// 2. title
// 3. pais = null -->> un objeto país nulo
// 4. errores
// 1. campo donde falló
// 2. mensaje de corrección

// Response renderizar formulario editar
// 1. formulario datos formualario
// 2. title
// 3. pais ->> pais obtenido por su id
// 4. errores
// 1. campo donde falló
// 2. mensaje de corrección

// Renderizar vista principal Dasbhoard
export async function getDashboard(req, res) {
	try {
		const response = await obtenerTodosLosPaises();
		res.locals.title = 'Dashobard | GeoPanel';
		res.locals.respuesta = response;
		res.locals.mensaje = {
			msg: req.query.msg || null,
			tipo: req.query.tipo || null,
		};
		res.render('dashboard');
	} catch (err) {
		res.status(500).json({
			mensaje: 'Error al obtener los paises',
			error: err.message,
		});
	}
}

// Renderizar formulario para crear un país con los campos vacios
export async function getFormularioCrear(_req, res) {
	try {
		const datos = await obtenerDocumentoDatosFormulario();
		res.locals.title = 'Crear nuevo País';
		res.locals.pais = null;
		res.locals.datosFormulario = datos;
		res.render('addCountry');
	} catch (err) {
		res.status(500).json({
			mensaje: 'Error al renderizar el formulario para crear un país',
			error: err.message,
		});
	}
}

// Controlador para la ruta de obtener los datos para formulario
export async function getDatosFormulario(_req, res) {
	try {
		const datosFormulario = await obtenerDocumentoDatosFormulario();
		console.log('Documento con los datos para formularios', datosFormulario);
		if (!datosFormulario) {
			return res.status(404).json({
				mensaje:
					'No se pudo encontrar el documento con los datos para los formularios',
			});
		}
		res.status(200).json(datosFormulario);
	} catch (err) {
		res.status(500).json({
			mensaje: 'Error al obtener los datos para el formulario',
			error: err.message,
		});
	}
}

// Controlador para buscar un país por id
export async function getPaisPorId(req, res) {
	try {
		const { id } = req.params;
		const pais = await buscarPorId(id);
		if (!pais) {
			return res.status(404).json({
				mensaje: `No se encontro el País con el id: ${id}`,
			});
		}
		res.status(200).json(pais);
	} catch (err) {
		res.status(200).json({
			mensaje: 'Error al buscar el país por id',
			error: err.message,
		});
	}
}

// Controller ruta para crear un país
export async function postPais(req, res) {
	try {
		const pais = req.body;
		console.log('Pais obtenido del body: ', pais);
		await crearPais(pais);
		console.log('Pais Creado exitosamente');
		res
			.status(204)
			.redirect('/GeoPanel/?msg=País agregado correctamente&tipo=exito');
	} catch (err) {
		res.status(500).json({
			mensaje: 'Error al crear el nuevo país',
			error: err.message,
		});
	}
}

// Controller ruta para actualizar/editar país
export async function putPais(req, res) {
	try {
		const id = req.params.id;
		const paisActualizado = req.body;
		const respuesta = await actualizarPais(id, paisActualizado);
		console.log(respuesta);
		res.status(200).json(respuesta);
	} catch (err) {
		res.status(500).json({
			mensaje: 'Error al actualizar/editar el país',
			error: err.message,
		});
	}
}

// Controller de ruta para eliminar un país por su id
export async function deletePais(req, res) {
	try {
		const id = req.params.id;
		await eliminarPais(id);
		res.redirect(`${res.locals.prefijo}/?msg=País eliminado correctamente&tipo=exito`)
	} catch (err) {
		res.status(500).json({
			mensaje: 'Error al eliminar el País',
			error: err.message,
		});
	}
}
