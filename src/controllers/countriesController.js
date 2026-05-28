import {
	upsertPisesHispanos,
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
		await upsertPisesHispanos(paises);
		console.log('Seed de paises realizada exitosamente');
	} catch (error) {
		console.log('Error al sembrar los países en el controlador:', error);
	}
}
