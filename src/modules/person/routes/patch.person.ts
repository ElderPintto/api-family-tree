import type { FastifyTypeInstance } from "@/infra/models/types.fastifyInstace.js";

import z from "zod";
import { type Person, PersonUpdate } from "../interfaces/index.js";
import { PersonUseCase } from "../useCases/person.update.useCase.js";

export function patch(app: FastifyTypeInstance) {
	app.patch(
		"/person/:id",
		{
			schema: {
				tags: ["person"],
				description: "Update a person by id",
				params: z.object({
					id: z.string(),
				}),
				body: PersonUpdate,
				200: z.object({}).nullable(),
				404: z.object({
					message: z.object({}),
				}),
				500: z.object({
					message: z.object({}),
				}),
			},
		},
		async (request, reply) => {
			const { id } = request.params;
			const personUseCase = new PersonUseCase();

			try {
				const result = await personUseCase.update(id, request.body);
				if (!result) {
					return reply.status(404).send({ message: "Error fetching people" });
				}
				return reply.status(200).send(result as unknown as Person);
			} catch (error) {
				reply.status(500).send({ message: String(error) });
			}
			return reply.status(200).send({ id });
		},
	);
}
