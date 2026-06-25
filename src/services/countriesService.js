import { compileFunction } from 'node:vm';
import Countries from '../repositories/countriesRepository.js';
import { getCipherInfo } from 'node:crypto';

// --------------------- Seed de países ------------------------------ //

// Recopilar datos de los paises para formulario
export function recopilarDatosPaises(paises) {
	let banderasURL = [];
	let zonasHorarias = [];
	let subregiones = [];
	paises.forEach((pais) => {
		banderasURL.push(pais.flag.url_png);
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
	zonasHorarias = ordenarAlfabeticamente(zonasHorarias);
	subregiones = ordenarAlfabeticamente(subregiones);
	return { banderasURL, zonasHorarias, subregiones };
}

// Ordenar alfabeticamente zonasHorarias y subregiones
function ordenarAlfabeticamente(array) {
	return array.sort((a, b) => a.localeCompare(b));
}

// Hacer el upsert del documento con los datos recopilados llamando al método del repositorio
export async function uspertDocumentoFormulario(paises) {
	const documento = recopilarDatosPaises(paises);
	return await Countries.upsertDocumento(documento);
}

function filtrarPaisesHispanos(paises) {
	return paises.filter((pais) => {
		return pais.languages.some(lang => lang.bcp47 === 'es');
	});
}

// Formatear los pases al esquema y filtra los campos necesarios
function transformarPaisesAlFormatoModelo(paises) {
	return paises.map((pais) => {
		// Obtener las capitales
		const capitales = pais.capitals.map((capital) => capital.name);

		// Obtener las monedas en un array
		const monedas = pais.currencies.map((currency) => {
			return { simbolo: currency.symbol, nombre: currency.name }
		});

		// Obtener mediciones del indice de Gini
		const claves = Object.keys(pais.economy.gini_coefficient);
		const gini = claves.map((clave) => {
			return { anio: Number(clave), valor: pais.economy.gini_coefficient[clave] };
		});

		return {
			nombre: {
				comun: pais.names.translations.spa.common ?? pais.names?.common,
				oficial: pais.names.translations.spa.official ?? pais.names?.official
			},
			bandera: pais.flag.url_png ?? null,
			capital: capitales,
			subregion: pais.subregion ?? null,
			fronteras: pais.borders ?? null,
			area: pais.area.kilometers ?? 1,
			poblacion: pais.population ?? 1,
			zonasHorarias: pais.timezones ?? [],
			moneda: monedas,
			independiente: !pais.classification.dependency ?? false,
			miembroONU: pais.classification.un_member ?? false,
			salidaAlMar: !pais.landlocked ?? false,
			fifa: pais.codes.fifa ?? null,
			coordenadas: {
				latitud: pais.coordinates.lat ?? 0.0,
				longitud: pais.coordinates.lng ?? 0.0,
			},
			indiceGini: gini,
		};
	});
}

// Hacer upsert de los paises filtrados con los campos formateados llamando al método del repositorio
export async function upsertPaisesHispanos(paises) {
	const paisesHispanos = filtrarPaisesHispanos(paises);
	const paisesFormateados = transformarPaisesAlFormatoModelo(paisesHispanos);
	return await Countries.uspertPaises(paisesFormateados);
}

// ----------------------------------------------------------- //

export async function obtenerTodosLosPaises() {
	const paisesObtenidos = await Countries.obtenerPaises();
	const totalArea = calcularTotales(paisesObtenidos, 'area');
	const totalPoblacion = calcularTotales(paisesObtenidos, 'poblacion');
	const promedioGini = calcularPromedioGini(paisesObtenidos);
	const paises = ordenarPaisesFechaCreacion(paisesObtenidos);
	return { paises, totalArea, totalPoblacion, promedioGini };
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

function ordenarPaisesFechaCreacion(paisesObtenidos) {
	return paisesObtenidos.sort((a, b) => b.createdAt - a.createdAt);
}

function calcularTotales(paises, clave) {
	const total = paises.reduce((acc, pais) => {
		if (pais[clave]) {
			acc = acc + pais[clave];
		}
		return acc;
	}, 0);
	return total;
}

function calcularPromedioGini(paises) {
	let contador = 0;
	const acumulado = paises.reduce((acc, pais) => {
		if (pais.indiceGini.valor !== undefined) {
			acc = acc + pais.indiceGini.valor;
			contador++;
		}
		return acc;
	}, 0);
	return acumulado / contador;
}
