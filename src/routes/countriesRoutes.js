import { Router } from 'express';

const countriesRouter = Router();

// Ruta para probar si el servidor está funcionando
countriesRouter.get('/', (_req, res) => {
	res.json({ message: 'Ruta funcionando' });
});

export default countriesRouter;
