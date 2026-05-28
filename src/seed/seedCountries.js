import conectarDB from '../config/DBConfig.js';
import { sembrarPaises } from '../controllers/countriesController.js';

async function seedPaises() {
	try {
		await conectarDB();
		await sembrarPaises();
		console.log('Países sembrados exitosamente');
	} catch (error) {
		console.error('Error al sembrar los países:', error);
	} finally {
		process.exit();
	}
}

seedPaises();
