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
export async function sembrarPaises() {
	try {
		const response = await fetch(
			'https://restcountries.com/v3.1/region/america',
		);
		const paises = response.ok ? await response.json() : [];
		await uspertDocumentoFormulario(paises);
		console.log('Seed de documento para formulario realizada exitosamente');
		await upsertPaisesHispanos(paises);
		console.log('Seed de paises realizada exitosamente');
	} catch (error) {
		console.log('Error al sembrar los países en el controlador:', error);
	}
}

// Controlador para la ruta de obtener todos los países de la colección
export async function getDashboard(req, res) {
	try {
		const paisesObtenidos = await obtenerTodosLosPaises();
		// dashboardResData.paises = paisesObtenidos;
		res.status(200).render('dashboard', {
			title: 'Dashobard | GeoPanel',
			paises: paisesObtenidos,
			mensaje: req.query.mensaje || null,
			tipoMensaje: req.query.tipoMensaje || null,
		});
	} catch (err) {
		res.status(500).json({
			mensaje: 'Error al obtener los paises',
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
			.redirect(
				'/GeoPanel/?mensaje=País agregado correctamente&tipoMensaje=exito',
			);
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
		const resultado = await eliminarPais(id);
		console.log(resultado);
		res.status(200).json(resultado);
	} catch (err) {
		res.status(500).json({
			mensaje: 'Error al eliminar el País',
			error: err.message,
		});
	}
}
