// Implementación del los metodos de la interfaz de repositorio para países

import mongoose from 'mongoose';
import Paises from '../models/Country.js';
import DatosFormulario from '../models/FormData.js';
import InterfaceCountriesRepository from './InterfaceCountriesRepository.js';

// Consulta primero si el ID es un ObjectId que es el formato que MongoDB utiliza para los IDs.
function validarId(id) {
	if (!mongoose.Types.ObjectId.isValid(id)) {
		throw new Error('ID no válido');
	}
}

// Implementar los métodos de la interfaz de repositorio para países
class CountriesRepository extends InterfaceCountriesRepository {
	// Obtener todos los países de la colección
	async obtenerPaises() {
		return await Paises.find({});
	}

	// Buscar un país por su  ID
	async buscar(id) {
		validarId(id);
		return await Paises.findById(id);
	}

	// Crear un nuevo país en la colección
	async crear(pais) {
		const nuevoPais = new Paises(pais);
		return await nuevoPais.save();
	}

	// Actualizar por completo un país por si ID
	async actualizar(id, paisActualizado) {
		validarId(id);
		return await Paises.findByIdAndUpdate(id, paisActualizado, {
			returnDocument: 'after',
		});
	}

	// Buscar y eliminar un país por su ID
	async eliminar(id) {
		validarId(id);
		return await Paises.findByIdAndDelete(id);
	}

	// Busca el documento con los datos recopilados para los formularios, es un documento único en la Colección 'DatosFormulario'
	async obtenerDatosFormulario() {
		return await DatosFormulario.findOne({});
	}

	// Verificar si existe un país en la colección por su nombre oficial, para evitar duplicados
	async verificarSiExiste() {
		const filtro = {
			$and: [{ tipoDocumento: 'Pais', 'nombre.oficial': nombre.oficial }],
		};
		// El método exists busca un documento que cumpla con el filtro y devuelve su _id
		//  Es más rapido y eficiente que el método find o findOne porque no devuelve todo el documento.
		return await Paises.exists(filtro);
	}

	// Hacer un uspert de cada país
	async uspertPais(paises) {
		// map() con async nos devuelve un array de promesas, una promesa por cada paísm, y promise.all() espera a que todas las promesas se resuelvan y devuelve un array con los resultados de cada promesa.
		return await Promise.all(
			paises.map(async (pais) => {
				const filtro = {
					$and: [
						{ tipoDocumento: 'Pais', 'nombre.oficial': pais.nombre.oficial },
					],
				};
				// Hacemos el upsert del país, si ya existe lo reemplaza, sino lo crea.
				return await Paises.replaceOne(filtro, pais, { upsert: true });
			}),
		);
	}

	// Hacer un upsert para el documento con los datos para el formulario, es un documento único en la colección 'DatosFormulario', si ya existe lo reemplaza, sino lo crea.
	async upsertDocumento(documento) {
		const filtro = { tipoDocumento: 'DatosForm' };
		return await DatosFormulario.replaceOne(filtro, documento, {
			upsert: true,
		});
	}
}

// Exportar una instancia de la clase CountriesRepository de forma global al todo el proyecto
export default new CountriesRepository();
