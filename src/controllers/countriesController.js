import {
	verificarSiElPaisExiste,
	buscarPorId,
	obtenerDocumentoDatosFormulario,
	obtenerTodosLosPaises,
	upsertPaisesHispanos,
	uspertDocumentoFormulario,
} from '../services/countriesService.js';

// Consumir Endpoint de paises
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

// Obetener todos los países para luego renderizar el el dasbhoard
export async function getTodosLosPaises(_req, res) {
	try {
		const paises = await obtenerTodosLosPaises();
		if (paises.length === 0) {
			return res.status(404).json({
				mensaje: 'No se encontron ningún país en la colección'
			})
		}
		console.log('Cantidad de paisese obtenidos:', paises.length);
		// Monstrar los paises obtenidos
		res.status(200).json(paises);
	} catch (err) {
		res.status(500).json({
			mensaje: 'Error al obtener los paises',
			error: err.message,
		});
	}
}

export async function getDatosFormulario(_req, res) {
	try {
		const datosFormulario = await obtenerDocumentoDatosFormulario()
		console.log('Documento con los datos para formularios', datosFormulario);
		if (!datosFormulario) {
			return res.status(404).json({
				mensaje: 'No se pudo encontrar el documento con los datos para los formularios'
			})
		}
		res.status(200).json(datosFormulario)
	} catch (err) {
		res.status(500).json({
			mensaje: 'Error al obtener los datos para el formulario',
			error: err.message
		});
	}
}

// Controlador para buscar un país por id
export async function getPaisPorId(req, res) {
	try {
		const { id } = req.params;
		const pais = await buscarPorId(id);
		if (pais.length < 1) {
			return res.status(404).json({
				mensaje: `No se encontro el País con el id: ${id}`
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
