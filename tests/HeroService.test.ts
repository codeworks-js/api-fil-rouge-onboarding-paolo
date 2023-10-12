import { HeroService } from '../src/services/HeroService';

describe('HeroService', () => {
	let heroService: HeroService;

	beforeEach(() => {
		heroService = new HeroService();
	});

	describe('list heroes', () => {
		it('should return multiple heroes', async () => {
			const heroes = await heroService.listHeroes();

			expect(heroes).toBeInstanceOf(Array);
			heroes.forEach((hero) => {
				expect(hero).toEqual({
					id: expect.any(Number),
					name: expect.any(String),
				});
			});
		});
	});

	describe('get hero by id', () => {
		it('should return an existing hero', async () => {
			const id = 13;
			const hero = await heroService.getHero(13);

			expect(hero).toEqual({
				id,
				name: expect.any(String),
			});
		});

		it('should return null when hero does not exist', async () => {
			const id = -1;
			const hero = await heroService.getHero(id);

			expect(hero).toBe(null);
		});
	});

	describe('add hero', () => {
		it('should create the hero', async () => {
			const newHero = await heroService.addHero('Paolo');
			const hero = await heroService.getHero(newHero.id);

			expect(hero).toEqual(newHero);
		});

		it('should append the new hero in the list', async () => {
			const previousList = await heroService.listHeroes();
			await heroService.addHero('Paolo');
			const currentList = await heroService.listHeroes();

			expect(currentList.length).toBeGreaterThan(previousList.length);
		});
	});

	describe('modify hero', () => {
		it('should change the name of the hero', async () => {
			const id = 13;
			const name = 'new name';
			await heroService.modifyHero({
				id,
				name,
			});
			const hero = await heroService.getHero(id);

			expect(hero).toEqual({
				id,
				name,
			});
		});
	});

	describe('remove hero', () => {
		it('should remove the hero', async () => {
			const hero = await heroService.addHero('new character');
			await heroService.removeHero(hero.id);
			const removedHero = await heroService.getHero(hero.id);

			expect(removedHero).toBe(null);
		});

		it('should reduce the content in the list of heroes', async () => {
			const hero = await heroService.addHero('new character');
			const previousList = await heroService.listHeroes();
			await heroService.removeHero(hero.id);
			const currentList = await heroService.listHeroes();

			expect(previousList.length).toBeGreaterThan(currentList.length);
		});
	});

	describe('search heroes', () => {
		it('should return a subset of the hero list', async () => {
			const term = 'a';
			const allHeroes = await heroService.listHeroes();
			const matchingHeroes = await heroService.searchHeroes(term);

			expect(allHeroes.length).toBeGreaterThanOrEqual(matchingHeroes.length);
		});

		it('should only return heroes whose names contain the search term', async () => {
			const term = 'a';
			const matchingHeroes = await heroService.searchHeroes(term);

			expect(
				matchingHeroes.every((hero) =>
					hero.name.toLowerCase().includes(term.toLowerCase()),
				),
			).toBe(true);
		});
	});
});
