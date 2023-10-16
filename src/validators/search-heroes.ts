import { z } from 'zod';

const schema = z.object({
	term: z.string().min(1),
});

export function validateSearchHeroes(payload: unknown): z.infer<typeof schema> {
	return schema.parse(payload);
}
