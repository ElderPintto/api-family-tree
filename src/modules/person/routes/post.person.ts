import type { FastifyTypeInstance } from "@/infra/models/types.fastifyInstace.js";
import z from "zod";
import { Person } from "../interfaces/index.js";
import { PersonUseCase } from "../useCases/person.create.useCase.js";

export function post(app: FastifyTypeInstance) {
	app.post(
		"/person",
		{
			schema: {
				tags: ["person"],
				description: "Create a new person",
				body: Person.omit({ id: true }),
				response: {
					201: z.object({
						id: z.string().uuid(),
					}),
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
				const result = await personUseCase.create(request.body);

				if (!result?.id) {
					return reply.status(400).send({ error: "Error creating person" });
				}

				return reply.status(201).send({ id: result.id });
			} catch (error) {
				reply.status(500).send({ error: String(error) });
			}
		},
	);
}
