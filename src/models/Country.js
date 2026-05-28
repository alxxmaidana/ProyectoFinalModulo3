import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const PaisSchema = new mongoose.Schema({
	nombre: {
		comun: {
			type: String,
			trim: true,
			required: true,
			minlength: 3,
			maxlength: 90,
		},
		oficial: {
			type: String,
			trim: true,
			required: true,
			minlength: 3,
			maxlength: 90,
		},
	},
	capital: {
		type: [{ type: String, trim: true }],
		validate: {
			validator: (capital) => capital.length >= 1,
			message: 'El campo capital es obligatório',
		},
	},
	bandera: { type: String, trim: true, required: true }, // URL del PNG de la bandera
	subregion: { type: String, trim: true, required: true },
	fronteras: [{ type: String, trim: true, minlength: 3, maxlength: 3 }], // Array de códigos ISO de países vecinos
	area: { type: Number, required: true, min: 0 },
	poblacion: { type: Number, required: true, min: 0 },
	zonasHorarias: {
		// Array de zonas horarias del país
		type: [{ type: String, trim: true }],
		validate: {
			validator: (valor) => valor.length >= 1,
			message: 'El campo zonasHorarias es obligatorio',
		},
	},
	moneda: {
		simbolo: { type: String, trim: true, required: true, maxlength: 5 },
		nombre: {
			type: String,
			trim: true,
			required: true,
			minlength: 3,
			maxlength: 40,
		},
	},
	indepediente: { type: Boolean, required: true, default: false },
	miembroONU: { type: Boolean, required: true, default: false },
	salidaAlMar: { type: Boolean, required: true, default: false },
	fifa: {
		type: String,
		trim: true,
		required: true,
		minlength: 3,
		maxlength: 3,
	},
	latitudLongitud: {
		type: [Number],
		validate: [
			{
				validator: (latitudLongitud) => latitudLongitud.length === 2,
				message:
					'El campo latitudLongitud debe ser un array de dos números: [latitud, longitud]',
			},
			{
				validator: (latitudLongitud) =>
					latitudLongitud[0] >= -90 && latitudLongitud[0] <= 90, // Validar latitud entre -90 y 90,
				message: 'La latitud debe estar entre 90 y -90 grados',
			},
			{
				validator: (latitudLongitud) =>
					latitudLongitud[1] >= -180 && latitudLongitud[1] <= 180, // Validar longitud entre -180 y 180
				message: 'La longitud debe estár entre 180 y -180 grados',
			},
		],
	},
	// Algunos paises no tienen dato
	indiceGini: {
		valor: { type: Number, min: 0, max: 100 },
		anio: { type: Number, min: 1912, max: new Date().getFullYear() }, // Recortar el rango del año 1912 - 2026;
	},
	tipoDocumento: { type: String, trim: true, required: true, default: 'Pais' },
	timestamp: { type: Date, default: Date.now },
	creador: process.env.CREATOR,
});
// El tercer argumento 'Paises' es el nombre de la colección en MongoDB, y el primer argumento 'Paises' es el nombre del modelo que se usará en el código para referenciar esta colección.
const Paises = mongoose.model('Paises', PaisSchema, 'Paises');
export default Paises;
