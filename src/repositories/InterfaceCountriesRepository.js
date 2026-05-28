class InterfaceCountriesRepository {
	obtenerPaises() {
		throw new Error('Método "obtenerPaises()" no implementado');
	}

	buscar(_id) {
		throw new Error('Método "buscarPorId(_id)" no implementado');
	}

	crear(_pais) {
		throw new Error('Método "crearPais(_pais)" no implementado');
	}

	actualizar(_id, _paisActualizado) {
		throw new Error(
			'Método "actualizarPais(_id, _paisActualizado)" no implementado',
		);
	}

	eliminar(_id) {
		throw new Error('Método "eliminarPais(_id)" no implementado');
	}

	// Métod para verificar si el documento ya existe en la colección. Para evitar duplicados
	verficarSiExiste() {
		throw new Error('Método "verificarSiExiste()" no implementado');
	}

	// Obtener documento con los datos para formulario
	obtenerDatosFormulario() {
		throw new Error('Método "obtenerDatosFormulario()" no implementado');
	}

	// Upsert de paises
	upsertPais(_pais) {
		throw new Error('Método "upsertPais(pais)" no implementado');
	}

	// Upsert para los datos del formulario
	upsertDocumento(_documento) {
		throw new Error('Método "upsertDocumento(_documento)" no implementado');
	}
}

export default InterfaceCountriesRepository;
