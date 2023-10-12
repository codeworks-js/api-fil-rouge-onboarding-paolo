import { InMemoryHeroes } from '../data-access/Heroes';
import { Hero } from '../types/Hero';

export class HeroService {
	constructor(private readonly heroes: InMemoryHeroes) {}

	async addHero(name: string): Promise<Hero> {
		return this.heroes.addHero(name);
	}

	async getHero(id: number): Promise<Hero | null> {
		return this.heroes.getHero(id);
	}

	async listHeroes(): Promise<Hero[]> {
		return this.heroes.listHeroes();
	}

	async modifyHero(hero: Hero): Promise<void> {
		await this.heroes.modifyHero(hero);
	}

	async removeHero(id: number): Promise<void> {
		await this.heroes.removeHero(id);
	}

	async searchHeroes(term: string): Promise<Hero[]> {
		return this.heroes.searchHeroes(term);
	}
}
