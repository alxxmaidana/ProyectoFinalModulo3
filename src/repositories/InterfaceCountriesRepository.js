class InterfaceCountriesRepository {
	// Obtener todos países de la colección
	obtenerPaises() {
		throw new Error('Método "obtenerPaises()" no implementado');
	}

	// Buscar un país por su ID
	buscar(_id) {
		throw new Error('Método "buscarPorId(_id)" no implementado');
	}

	// Crear un nuevo país en la colección
	crear(_pais) {
		throw new Error('Método "crearPais(_pais)" no implementado');
	}

	// Actualizar/editar un país por su ID
	actualizar(_id, _paisActualizado) {
		throw new Error(
			'Método "actualizarPais(_id, _paisActualizado)" no implementado',
		);
	}

	// Eliminar un país por su ID
	eliminar(_id) {
		throw new Error('Método "eliminarPais(_id)" no implementado');
	}

	verficarSiExiste() {
		throw new Error('Método "verificarSiExiste()" no implementado');
	}

	// Obtener documento con los datos para formulario
	obtenerDatosFormulario() {
		throw new Error('Método "obtenerDatosFormulario()" no implementado');
	}

	// Upsert de paises y documento con datos para formulario
	upsertPais(_pais) {
		throw new Error('Método "upsertPais(pais)" no implementado');
	}

	upsertDocumento(_documento) {
		throw new Error('Método "upsertDocumento(_documento)" no implementado');
	}
}

export default InterfaceCountriesRepository;
