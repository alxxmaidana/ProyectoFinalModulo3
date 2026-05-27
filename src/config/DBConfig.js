// Archivo de configuración de la base de datos, y exportar la conexión

import dns from 'node:dns';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
// Setear servidores DNS a Cloudflare y Google para evitar problemas de resolución de nombres en la conexión a la base de datos
dns.setServers(['1.1.1.1'], ['8.8.8.8']);

// Conectar a la vase de datos
async function conectarDB() {
	try {
		await mongoose.connect(process.env.CONNECTION_STRING);
		console.log('Conexión a la base de datos exitosa');
	} catch (error) {
		console.error('Error al conectar a la base de datos: ', error);
	}
}

export default conectarDB;
