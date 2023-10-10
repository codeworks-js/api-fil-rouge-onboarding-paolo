import Express from 'express';
import { HeroService } from './services/HeroService';

const app = Express();
const port = process.env.PORT || 3000;
const heroService = new HeroService();

app.get('/heroes', async (_, res) => {
	res.json(await heroService.listHeroes());
});

app.listen(port, () => {
	console.log(`Listening on port ${port}.`);
});
