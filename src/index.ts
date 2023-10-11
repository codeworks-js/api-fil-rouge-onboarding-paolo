import BodyParser from 'body-parser';
import Express from 'express';
import { HeroService } from './services/HeroService';

const app = Express();
const port = process.env.PORT || 3000;
const heroService = new HeroService();

app.use(BodyParser.json());

app.post('/heroes', async (req, res) => {
	const { name } = req.body;
	const hero = await heroService.addHero(name);
	res.status(201).json(hero);
});

app.get('/heroes/:id', async (req, res) => {
	const id = Number(req.params.id);
	const hero = await heroService.getHero(id);

	if (hero === null) {
		res.sendStatus(404);
		return;
	}
	res.json(hero);
});

app.get('/heroes', async (_, res) => {
	res.json(await heroService.listHeroes());
});

app.get('/heroes/search', async (req, res) => {
	const term = String(req.query.term);
	res.json(await heroService.searchHeroes(term));
});

app.put('/heroes', async (req, res) => {
	const hero = req.body;
	await heroService.modifyHero(hero);
	res.sendStatus(200);
});

app.delete('/heroes/:id', async (req, res) => {
	const id = Number(req.params.id);
	await heroService.removeHero(id);
	res.sendStatus(200);
});

app.listen(port, () => {
	console.log(`Listening on port ${port}.`);
});
