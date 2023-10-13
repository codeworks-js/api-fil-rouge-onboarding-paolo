import { z } from 'zod';

const schema = z.object({
	id: z.number().min(0),
});

export function validateGetHero(
	payload: unknown,
): payload is z.infer<typeof schema> {
	return schema.safeParse(payload).success;
}
