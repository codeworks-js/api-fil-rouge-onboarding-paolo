import { Hero } from '../types/Hero';

const allHeroes: Hero[] = [
	{ id: 12, name: 'Dr. Nice' },
	{ id: 13, name: 'Bombasto' },
	{ id: 14, name: 'Celeritas' },
	{ id: 15, name: 'Magneta' },
	{ id: 16, name: 'RubberMan' },
	{ id: 17, name: 'Dynama' },
	{ id: 18, name: 'Dr. IQ' },
	{ id: 19, name: 'Magma' },
	{ id: 20, name: 'Tornado' },
];

export class HeroService {
	private data = new Map<number, Hero>(
		allHeroes.map((hero) => [hero.id, hero]),
	);

	async addHero(name: string): Promise<Hero> {
		const hero: Hero = {
			id: this.newId(),
			name,
		};

		this.data.set(hero.id, hero);

		return hero;
	}

	async listHeroes(): Promise<Hero[]> {
		return Array.from(this.data.values());
	}

	private newId(): number {
		return this.data.size > 0 ? Math.max(...this.data.keys()) + 1 : 11;
	}
}
