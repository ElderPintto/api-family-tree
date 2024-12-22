import type {
	Person,
	PersonCreate,
	PersonRepository,
} from "../interfaces/index.js";
import { PersonRepositoryPrisma } from "../repositories/person.repository.js";

class PersonUseCase {
	private readonly personRepository: PersonRepository;
	constructor() {
		this.personRepository = new PersonRepositoryPrisma();
	}

	async findAll(): Promise<Person[]> {
		const result = await this.personRepository.findAll();
		return result;
	}
}

export { PersonUseCase };
