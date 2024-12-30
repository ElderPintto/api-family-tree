import type { FastifyTypeInstance } from "@/infra/models/types.fastifyInstace.js";
import z from "zod";
import { PersonUseCase as PersonUseCaseFindById } from "../useCases/person.findById.useCase.js";
import { PersonUseCase } from "../useCases/person.remove.useCase.js";
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
						message: z.string(),
					}),
					404: z.object({
						message: z.object({}),
					}),
					500: z.object({
						message: z.object({}),
					}),
				},
			},
		},
		async (request, reply) => {
			const { id } = request.params;
			const personUseCase = new PersonUseCase();
			const personUseCaseFindById = new PersonUseCaseFindById();

			try {
				const person = await personUseCaseFindById.findById(id);

				if (!person?.id) {
					return reply.status(404).send({ message: "Error fetching person" });
				}

				await personUseCase.remove(id);
				return reply
					.status(200)
					.send({ message: `${person.lastName} deleted successfully` });
			} catch (error) {
				reply.status(500).send({ message: String(error) });
			}
		},
	);
}
