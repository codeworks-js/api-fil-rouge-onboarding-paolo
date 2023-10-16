import { PrismaClient } from '@prisma/client';
import BodyParser from 'body-parser';
import Cors from 'cors';
import Express, { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { PrismaHeroes } from './data-access/PrismaHeroes';
import { HeroService } from './services/HeroService';
import { wrap } from './utils/error-wrapper';
import { validateAddHero } from './validators/add-hero';
import { validateGetHero } from './validators/get-hero';
import { validateRemoveHero } from './validators/remove-hero';
import { validateSearchHeroes } from './validators/search-heroes';
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
		const payload = validateAddHero(req.body);
		const { name } = payload;
		const hero = await heroService.addHero(name);
		res.status(201).json(hero);
	}),
);

app.get(
	'/heroes/search',
	wrap(async (req, res) => {
		const payload = validateSearchHeroes(req.query);
		res.json(await heroService.searchHeroes(payload.term));
	}),
);

app.get(
	'/heroes/:id',
	wrap(async (req, res) => {
		const params = validateGetHero(req.params);
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
		const payload = validateUpdateHero(req.body);
		await heroService.modifyHero(payload);
		res.sendStatus(200);
	}),
);

app.delete(
	'/heroes/:id',
	wrap(async (req, res) => {
		const params = validateRemoveHero(req.params);
		await heroService.removeHero(params.id);
		res.sendStatus(200);
	}),
);

app.use((err: Error, _: Request, res: Response, __: NextFunction) => {
	console.error(err);
	let status = 500;
	let message = 'Something went wrong.';

	switch (err.constructor) {
		case ZodError:
			status = 400;
			message = 'Invalid payload.';
	}
	res.status(status).json({ message });
});

app.listen(port, () => {
	console.log(`Listening on port ${port}.`);
});
