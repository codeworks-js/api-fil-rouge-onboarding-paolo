import { z } from 'zod';

const schema = z.object({
	name: z.string().min(1),
});

export function validateAddHero(payload: unknown): z.infer<typeof schema> {
	return schema.parse(payload);
}
