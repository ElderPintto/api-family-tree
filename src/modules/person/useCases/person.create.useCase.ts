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

	async create(data: PersonCreate): Promise<Person> {
		if (!data) throw new Error("Data is required");
		const result = await this.personRepository.create(data);
		return result;
	}
}

export { PersonUseCase };
