import type { PersonRepository } from "../interfaces/index.js";
import { PersonRepositoryPrisma } from "../repositories/person.repository.js";

class PersonUseCase {
	private readonly personRepository: PersonRepository;
	constructor() {
		this.personRepository = new PersonRepositoryPrisma();
	}

	async remove(personId: string): Promise<void> {
		const result = await this.personRepository.remove(personId);
		return result;
	}
}

export { PersonUseCase };
