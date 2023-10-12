import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const allHeroes = [
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

async function seeder() {
	await prisma.$transaction(
		allHeroes.map((hero) => {
			return prisma.hero.upsert({
				where: {
					id: hero.id,
					name: hero.name,
				},
				update: {},
				create: {
					id: hero.id,
					name: hero.name,
				},
			});
		}),
	);
}

seeder()
	.then(async () => await prisma.$disconnect())
	.catch(async (err) => {
		console.error(err);
		await prisma.$disconnect();
		process.exit(1);
	});
