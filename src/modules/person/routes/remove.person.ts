import type { FastifyTypeInstance } from "@/infra/models/types.fastifyInstace.js";
import z from "zod";

export function remove(app: FastifyTypeInstance) {
	app.delete(
		"/person/:id",
		{
			schema: {
				tags: ["person"],
				description: "Delete a person by id",
				params: z.object({
					id: z.string(),
				}),
				response: {
					200: z.object({
						id: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { id } = request.params;
			return reply.status(200).send({ id });
		},
	);
}
