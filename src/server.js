// Archivo para levantar el servidor y conectar a la base de datos

import conectarDB from './config/DBConfig.js';
import { app, port } from './expressConfig.js';

async function iniciarServidor() {
	try {
		await conectarDB();
		app.listen(port, () => {
			console.log(`Servidor corriendo en http://localhost:${port}`);
		});
	} catch (error) {
		console.error('Error al iniciar el servidor: ', error);
	}
}

iniciarServidor();
