import mongoose from 'mongoose';

const DatosFormularioSchema = new mongoose.Schema({
	banderasURL: [{ type: String, trim: true }],
	zonasHorarias: [{ type: String, trim: true }],
	subregiones: [{ type: String, trim: true }],
});

const DatosFormulario = mongoose.model(
	'DatosFormulario',
	DatosFormularioSchema,
	'DatosFormulario',
);
export default DatosFormulario;
