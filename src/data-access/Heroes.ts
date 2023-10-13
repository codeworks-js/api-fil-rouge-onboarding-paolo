import { Hero } from '../types/Hero';

export interface Heroes {
	addHero(name: string): Promise<Hero>;
	getHero(id: number): Promise<Hero | null>;
	listHeroes(): Promise<Hero[]>;
	modifyHero(hero: Hero): Promise<void>;
	removeHero(id: number): Promise<void>;
	searchHeroes(term: string): Promise<Hero[]>;
}
