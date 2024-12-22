import type { FastifyTypeInstance } from "@/infra/models/types.fastifyInstace.js";
import z from "zod";
import { Person } from "../interfaces/index.js";

export function getByid(app: FastifyTypeInstance) {
	app.get(
		"/person/:id",
		{
			schema: {
				tags: ["person"],
				description: "Get a person by id",
				params: z.object({
					id: z.string(),
				}),
				response: {
					200: Person,
				},
			},
		},
		async (request, reply) => {
			const person = request.params;
			return reply.status(200).send(person as Person);
		},
	);
}
