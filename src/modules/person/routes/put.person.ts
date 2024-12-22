import type { FastifyTypeInstance } from "@/infra/models/types.fastifyInstace.js";

import z from "zod";
import { Person } from "../interfaces/index.js";

export function put(app: FastifyTypeInstance) {
	app.put(
		"/person/:id",
		{
			schema: {
				tags: ["person"],
				description: "Update a person by id",
				params: z.object({
					id: z.string(),
				}),
				body: Person,
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
