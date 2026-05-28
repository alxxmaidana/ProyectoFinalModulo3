import mongoose from 'mongoose';

// Esquema para almacenar Las URLs de las banderas, zonas horarias, y subregiones de cada pais de América en un documento, para luego usar estos datos para los formularios de creación y edición de países.
const DatosFormularioSchema = new mongoose.Schema({
	banderasURL: [{ type: String, trim: true }],
	zonasHorarias: [{ type: String, trim: true }],
	subregiones: [{ type: String, trim: true }],
	tipoDocumento: {
		type: String,
		trim: true,
		required: true,
		default: 'DatosForm',
	}, // Campo para identificar el tipo de documento, en este caso 'DatosForm', para que sea un documento único en la colección 'Paises'.
});
// tercer parametro es el nombre de la colección en la base de datos
const DatosForm = mongoose.model('DatosFrom', DatosFormularioSchema, 'Paises');
export default DatosForm;
