import type { FastifyTypeInstance } from "@/infra/models/types.fastifyInstace.js";
import z from "zod";
import { Person } from "../interfaces/index.js";
import { PersonUseCase } from "../useCases/person.findById.useCase.js";

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
				200: z.object({ Person }).nullable(),
				404: z.object({
					message: z.object({}),
				}),
				500: z.object({
					message: z.object({}),
				}),
			},
		},
		async (request, reply) => {
			const personUseCase = new PersonUseCase();
			try {
				const result = await personUseCase.findById(request.params.id);

				if (!result) {
					return reply.status(404).send({ message: "Error fetching people" });
				}

				return reply.status(200).send(result as unknown as Person);
			} catch (error) {
				reply.status(500).send({ message: String(error) });
			}
		},
	);
}
