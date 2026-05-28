import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Paises from '../models/Country.js';
import DatosForm from '../models/FormData.js';
import InterfaceCountriesRepository from './InterfaceCountriesRepository.js';

dotenv.config();

// Consulta primero si el ID es un ObjectId, que es el formato que MongoDB utiliza para los IDs.
function validarId(id) {
	if (!mongoose.Types.ObjectId.isValid(id)) {
		throw new Error('ID no válido');
	}
}

class CountriesRepository extends InterfaceCountriesRepository {
	async obtenerPaises() {
		const filtro = {
			$and: [
				{
					tipoDocumento: 'Pais',
					creador: process.env.CREATOR,
				},
			],
		};
		return await Paises.find(filtro);
	}

	async buscar(id) {
		validarId(id);
		return await Paises.findById(id);
	}

	async crear(pais) {
		const nuevoPais = new Paises(pais);
		return await nuevoPais.save();
	}

	async actualizar(id, paisActualizado) {
		validarId(id);
		return await Paises.findByIdAndUpdate(id, paisActualizado, {
			returnDocument: 'after',
		});
	}

	async eliminar(id) {
		validarId(id);
		return await Paises.findByIdAndDelete(id);
	}

	// Obtener de la colección el documeto úico con los datos para los formularios
	async obtenerDatosForm() {
		const filtro = {
			$and: [
				{
					tipoDocumento: 'DatosForm',
					creador: process.env.CREATOR,
				},
			],
		};
		// Usar el método findOne, porque find retorna un array de un solo documento.
		return await DatosForm.findOne(filtro);
	}

	// Verificar si existe un país en la colección por su nombre oficial y creador, para evitar duplicados
	async verificarSiExiste() {
		const filtro = {
			$and: [
				{
					'nombre.oficial': nombre.oficial,
					tipoDocumento: 'Pais',
					creador: process.env.CREATOR,
				},
			],
		};
		// El método Model.exists(), devuelve un objeto con el _id del documento encontrado (true), si no devuelve null (false)
		return await Paises.exists(filtro);
	}

	// Hacer un uspert de cada país
	async uspertPaises(paises) {
		return await Promise.all(
			paises.map(async (pais) => {
				const filtro = {
					$and: [
						{
							'nombre.oficial': pais.nombre.oficial,
							tipoDocumento: 'Pais',
							creador: process.env.CREATOR,
						},
					],
				};
				return await Paises.replaceOne(filtro, pais, { upsert: true });
			}),
		);
	}

	// Hacer un upsert para el documento con los datos para el formulario, es un documento único en la colección 'DatosForm', si ya existe lo reemplaza, sino lo crea.
	async upsertDocumento(documento) {
		const filtro = {
			$and: [
				{
					tipoDocumento: 'DatosForm',
					creador: process.env.CREATOR,
				},
			],
		};
		return await DatosForm.replaceOne(filtro, documento, {
			upsert: true,
		});
	}
}

// Exportar una instancia de la clase CountriesRepository de forma global al todo el proyecto
const Countries = new CountriesRepository();
export default Countries;
