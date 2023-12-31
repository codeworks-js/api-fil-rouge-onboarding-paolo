import { Hero } from '../types/Hero';
import { Heroes } from './Heroes';

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

export class InMemoryHeroes implements Heroes {
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

	async getHero(id: number): Promise<Hero | null> {
		return this.data.get(id) || null;
	}

	async listHeroes(): Promise<Hero[]> {
		return Array.from(this.data.values());
	}

	async modifyHero(hero: Hero): Promise<void> {
		this.data.set(hero.id, hero);
	}

	async removeHero(id: number): Promise<void> {
		this.data.delete(id);
	}

	async searchHeroes(term: string): Promise<Hero[]> {
		const completeHeroList = Array.from(this.data.values());
		const matchingHeroes = completeHeroList.filter((hero) =>
			hero.name.toLowerCase().includes(term.toLowerCase()),
		);
		return matchingHeroes;
	}

	private newId(): number {
		return this.data.size > 0 ? Math.max(...this.data.keys()) + 1 : 11;
	}
}
