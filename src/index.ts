import { PrismaClient } from '@prisma/client';
import BodyParser from 'body-parser';
import Cors from 'cors';
import Express, { NextFunction, Request, Response } from 'express';
import { PrismaHeroes } from './data-access/PrismaHeroes';
import { HeroService } from './services/HeroService';
import { wrap } from './utils/error-wrapper';
import { validateAddHero } from './validators/add-hero';
import { validateGetHero } from './validators/get-hero';
import { validateRemoveHero } from './validators/remove-hero';
import { validateUpdateHero } from './validators/update-hero';

const app = Express();
const port = process.env.PORT || 3000;

const prisma = new PrismaClient();
const heroes = new PrismaHeroes(prisma);
const heroService = new HeroService(heroes);

app.use(Cors({ origin: true }));
app.use(BodyParser.json());

app.post(
	'/heroes',
	wrap(async (req, res) => {
		const payload = req.body;
		if (!validateAddHero(payload)) {
			res.status(400).json({ message: 'Invalid payload.' });
			return;
		}

		const { name } = payload;
		const hero = await heroService.addHero(name);
		res.status(201).json(hero);
	}),
);

app.get(
	'/heroes/search',
	wrap(async (req, res) => {
		const term = String(req.query.term);
		res.json(await heroService.searchHeroes(term));
	}),
);

app.get(
	'/heroes/:id',
	wrap(async (req, res) => {
		const params = req.params;
		if (!validateGetHero(params)) {
			res.status(400).json({ message: 'Invalid payload.' });
			return;
		}
		const hero = await heroService.getHero(params.id);

		if (hero === null) {
			res.sendStatus(404);
			return;
		}
		res.json(hero);
	}),
);

app.get(
	'/heroes',
	wrap(async (_, res) => {
		res.json(await heroService.listHeroes());
	}),
);

app.put(
	'/heroes',
	wrap(async (req, res) => {
		const payload = req.body;
		if (!validateUpdateHero(payload)) {
			res.status(400).json({ message: 'Invalid payload.' });
			return;
		}
		await heroService.modifyHero(payload);
		res.sendStatus(200);
	}),
);

app.delete(
	'/heroes/:id',
	wrap(async (req, res) => {
		const params = req.params;
		if (!validateRemoveHero(params)) {
			res.status(400).json({ message: 'Invalid payload.' });
			return;
		}
		await heroService.removeHero(params.id);
		res.sendStatus(200);
	}),
);

app.use((err: Error, _: Request, res: Response, __: NextFunction) => {
	console.error(err);
	res.status(500).json({ message: 'Something went wrong.' });
});

app.listen(port, () => {
	console.log(`Listening on port ${port}.`);
});
