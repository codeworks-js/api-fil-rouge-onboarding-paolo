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

app.get('/heroes', async (_, res) => {
	res.json(await heroService.listHeroes());
});

app.listen(port, () => {
	console.log(`Listening on port ${port}.`);
});
