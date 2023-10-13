import { PrismaClient } from '@prisma/client';
import { Hero } from '../types/Hero';
import { Heroes } from './Heroes';

export class PrismaHeroes implements Heroes {
	constructor(private readonly prisma: PrismaClient) {}

	async addHero(name: string): Promise<Hero> {
		return this.prisma.hero.create({
			data: { name },
		});
	}

	async getHero(id: number): Promise<Hero | null> {
		return this.prisma.hero.findUnique({
			where: { id },
		});
	}

	async listHeroes(): Promise<Hero[]> {
		return this.prisma.hero.findMany();
	}

	async modifyHero(hero: Hero): Promise<void> {
		await this.prisma.hero.updateMany({
			where: { id: hero.id },
			data: { name: hero.name },
		});
	}

	async removeHero(id: number): Promise<void> {
		await this.prisma.hero.deleteMany({
			where: { id },
		});
	}

	async searchHeroes(term: string): Promise<Hero[]> {
		return this.prisma.hero.findMany({
			where: {
				name: {
					contains: term.toLowerCase(),
					mode: 'insensitive',
				},
			},
		});
	}
}
