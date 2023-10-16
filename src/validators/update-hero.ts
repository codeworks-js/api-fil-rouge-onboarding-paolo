import { z } from 'zod';

const schema = z.object({
	id: z.coerce.number().min(0),
	name: z.string().min(1),
});

export function validateUpdateHero(
	payload: unknown,
): payload is z.infer<typeof schema> {
	return schema.safeParse(payload).success;
}
