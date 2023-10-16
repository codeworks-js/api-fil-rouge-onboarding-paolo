import { z } from 'zod';

const schema = z.object({
	id: z.coerce.number().min(0),
});

export function validateRemoveHero(payload: unknown): z.infer<typeof schema> {
	return schema.parse(payload);
}
