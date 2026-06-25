import conectarDB from '../config/DBConfig.js';
import { sembrarPaises } from '../controllers/countriesController.js';

import dotenv from 'dotenv'
dotenv.config()

async function seedPaises() {
	try {
		await conectarDB();
		await sembrarPaises(process.env.BEARER_API_TOKEN);
		console.log('Países sembrados exitosamente');
	} catch (error) {
		console.error('Error al sembrar los países:', error);
	} finally {
		process.exit();
	}
}

seedPaises();
