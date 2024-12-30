import type {
	Person,
	PersonRepository,
	PersonUpdate,
} from "../interfaces/index.js";
import { PersonRepositoryPrisma } from "../repositories/person.repository.js";

class PersonUseCase {
	private readonly personRepository: PersonRepository;
	constructor() {
		this.personRepository = new PersonRepositoryPrisma();
	}

	async update(personId: string, person: PersonUpdate): Promise<Person | null> {
		const result = await this.personRepository.update(personId, person);
		return result;
	}
}

export { PersonUseCase };
