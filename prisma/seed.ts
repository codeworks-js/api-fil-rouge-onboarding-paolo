import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const allHeroes = [
	'Dr. Nice',
	'Bombasto',
	'Celeritas',
	'Magneta',
	'RubberMan',
	'Dynama',
	'Dr. IQ',
	'Magma',
	'Tornado',
];

async function seeder() {
	await prisma.hero.createMany({
		data: allHeroes.map((name) => ({ name })),
	});
}

seeder()
	.then(async () => await prisma.$disconnect())
	.catch(async (err) => {
		console.error(err);
		await prisma.$disconnect();
		process.exit(1);
	});
