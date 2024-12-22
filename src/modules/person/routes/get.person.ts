import type { FastifyTypeInstance } from "@/infra/models/types.fastifyInstace.js";
import z from "zod";
import { Person } from "../interfaces/index.js";
import { PersonUseCase } from "../useCases/person.findAll.useCase.js";

export function get(app: FastifyTypeInstance) {
	app.get(
		"/person",
		{
			schema: {
				description: "Get all people",
				tags: ["person"],
				response: {
					200: z.array(Person),
					400: z.object({
						error: z.object({}),
					}),
					500: z.object({
						error: z.object({}),
					}),
				},
			},
		},
		async (request, reply) => {
			const personUseCase = new PersonUseCase();
			try {
				const result = await personUseCase.findAll();

				if (!result) {
					return reply.status(400).send({ error: "Error fetching people" });
				}

				return reply.status(200).send(result as unknown as Person[]);
			} catch (error) {
				reply.status(500).send({ error: String(error) });
			}
		},
	);
}
