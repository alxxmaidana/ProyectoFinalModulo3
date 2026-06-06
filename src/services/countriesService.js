import Countries from '../repositories/countriesRepository.js';

// --------------------- Seed de países ------------------------------ //

// Recopilar datos de los paises para formulario
export function recopilarDatosPaises(paises) {
	const banderasURL = [];
	let zonasHorarias = [];
	const subregiones = [];

	paises.forEach((pais) => {
		banderasURL.push(pais.flags.png);
		const zonasHorariasPais = pais.timezones;
		for (let i = 0; i < zonasHorariasPais.length; i++) {
			// Si la zona horaria no está en el array, la agrega
			if (!zonasHorarias.includes(zonasHorariasPais[i])) {
				zonasHorarias.push(zonasHorariasPais[i]);
			}
		}
		const subregionPais = pais.subregion;
		if (!subregiones.includes(subregionPais)) {
			subregiones.push(subregionPais);
		}
	});
	// Agregar la opción "Sin Subregión" al array de subregiones, para los países que no tienen subregión.
	subregiones.push('Sin Subregión');
	zonasHorarias = ordenarZonasHorarias(zonasHorarias);
	return { banderasURL, zonasHorarias, subregiones };
}

function ordenarZonasHorarias(zonasHorarias) {
	zonasHorarias.sort((a, b) => a.localeCompare(b));
	return zonasHorarias;
}

// Upsert del documento con los datos recopilados
export async function uspertDocumentoFormulario(paises) {
	const documento = recopilarDatosPaises(paises);
	return await Countries.upsertDocumento(documento);
}

function filtrarPaisesHispanos(paises) {
	return paises.filter((pais) => pais.languages.spa);
}

/* ***************************************************************
El objeto 'currencies' tiene como clave el código ISO de la moneda, 
y como valor un objeto con el nombre y simbolo de la moneda.

Con Object.values() obtenemos los valores del la clave del objeto 'currencies'
(la clave es el código ISO de la moneda), obteniendo un array de objeto con el 
nombre y el simbolo de la moneda, y con [0] acccemos al primer objeto del array, 
que sería la primera moneda del país.
***************************************************************** */

/* *****************************************************************
El objeto 'gini' tiene al año como clave y el indice de Gini como su valor.
Con objet.values() obtenemos los valores del objeto 'gini' (el valor indice gini),
y con Object.keys() obtenemos las claves del objeto 'gini' (año de midición).

Se usa '?' para evitar el error de que el país no tenga el campo, si no lo tiene
le asigna null.
****************************************************************** */

// Formatear los pases al esquema y filtra los campos necesarios
function transformarPaisesAlFormatoModelo(paises) {
	return paises.map((pais) => {
		const primeraMoneda = Object.values(pais.currencies)[0] ?? null;
		const moneda = primeraMoneda
			? {
					simbolo: primeraMoneda.symbol ?? 'N/A',
					nombre: primeraMoneda.name ?? 'N/A',
				}
			: null;
		const gini = pais.gini
			? {
					valor: Object.values(pais?.gini)[0],
					anio: Object.keys(pais?.gini)[0],
				}
			: null;

		return {
			nombre: {
				comun: pais.name.nativeName.spa.common ?? pais.name?.common,
				oficial: pais.name.nativeName.spa.official ?? pais.name?.official,
			},
			bandera: pais.flags.png ?? '',
			capital: pais.capital ?? [],
			subregion: pais.subregion ?? 'Sin Subregión',
			fronteras: pais.borders ?? [],
			area: pais.area ?? 0,
			poblacion: pais.population ?? 1,
			zonasHorarias: pais.timezones ?? [],
			moneda: moneda,
			independiente: pais.independent ?? false,
			miembroONU: pais.unMember ?? false,
			salidaAlMar: !pais.landlocked ?? false,
			fifa: pais.fifa ?? null,
			latitudLongitud: pais.latlng ?? [0.0, 0.0],
			coordenadas: {
				latitud: pais.latlng[0] ?? 0.0,
				longitud: pais.latlng[1] ?? 0.0,
			},
			indiceGini: gini,
		};
	});
}

// Upsert paises hispanos
export async function upsertPaisesHispanos(paises) {
	const paisesHispanos = filtrarPaisesHispanos(paises);
	const paisesFormateados = transformarPaisesAlFormatoModelo(paisesHispanos);
	return await Countries.uspertPaises(paisesFormateados);
}

// ------------------------------------------------------------------- //


export async function obtenerTodosLosPaises() {
	return await Countries.obtenerPaises();
}

export async function obtenerDocumentoDatosFormulario() {
	return await Countries.obtenerDatosFormulario();
}

export async function buscarPorId(id) {
	return await Countries.buscar(id);
}

export async function crearPais(pais) {
	return await Countries.crear(pais);
}

export async function actualizarPais(id, paisActualizado) {
	return await Countries.actualizar(id, paisActualizado);
}

export async function eliminarPais(id) {
	return await Countries.eliminar(id);
}
