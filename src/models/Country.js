import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const PaisSchema = new mongoose.Schema(
	{
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
		independiente: { type: Boolean, required: true, default: false },
		miembroONU: { type: Boolean, required: true, default: false },
		salidaAlMar: { type: Boolean, required: true, default: false },
		fifa: {
			type: String,
			trim: true,
			minlength: 3,
			maxlength: 3,
		},
		coordenadas: {
			latitud: { type: Number, min: -90, max: 90, required: true },
			longitud: { type: Number, min: -180, max: 180, required: true },
		},
		// Algunos paises no tienen dato
		indiceGini: {
			valor: { type: Number, min: 0, max: 100 },
			anio: { type: Number, min: 1912, max: new Date().getFullYear() }, // Recortar el rango del año 1912 - 2026;
		},
		tipoDocumento: {
			type: String,
			trim: true,
			required: true,
			default: 'Pais',
		},
		creador: {
			type: String,
			default: process.env.CREATOR,
			trim: true,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

const Paises = mongoose.model('Paises', PaisSchema, 'Paises');
export default Paises;
