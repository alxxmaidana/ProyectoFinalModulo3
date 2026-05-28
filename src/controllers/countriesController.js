import {
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
		console.log('Cantidad de paisese obtenidos:',paises.length)
		// Monstrar los paises obtenidos
		res.status(200).json(paises);
	} catch (err) {
		res.status(500).json({
			Mensaje: 'Error al obtener los paises',
			error: err.message,
		});
	}
}
