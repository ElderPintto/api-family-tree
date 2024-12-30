import type { Person, PersonRepository } from "../interfaces/index.js";
import { PersonRepositoryPrisma } from "../repositories/person.repository.js";

class PersonUseCase {
	private readonly personRepository: PersonRepository;
	constructor() {
		this.personRepository = new PersonRepositoryPrisma();
	}

	async findById(personId: string): Promise<Person | null> {
		const result = await this.personRepository.findById(personId);
		return result;
	}
}

export { PersonUseCase };
