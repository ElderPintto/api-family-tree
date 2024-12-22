import { prisma } from "@/infra/dataBase/prisma-client.js";
import type {
	Person,
	PersonCreate,
	PersonRepository,
} from "../interfaces/index.js";

class PersonRepositoryPrisma implements PersonRepository {
	async create(person: PersonCreate): Promise<Person> {
		const createdPerson = await prisma.person.create({
			data: {
				email: person.email,
				password: person.password,
				gender: person.gender,
				firstName: person.firstName,
				lastName: person.lastName,
				lastNameMother: person.lastNameMother ?? "",
				lastNameFather: person.lastNameFather ?? "",
				birthDate: new Date(person.birthDate),
				birthCity: person.birthCity,
				birthDistrict: person.birthDistrict,
				currentCity: person.currentCity,
				currentDistrict: person.currentDistrict,
			},
		});

		return createdPerson as unknown as Person;
	}

	async findAll(): Promise<Person[]> {
		const people = await prisma.person.findMany({
			orderBy: {
				createdAt: "desc",
			},
			select: {
				id: true,
				email: true,
				password: true,
				gender: true,
				firstName: true,
				lastName: true,
				lastNameMother: true,
				lastNameFather: true,
				birthDate: true,
				birthCity: true,
				birthDistrict: true,
				currentCity: true,
				currentDistrict: true,
				createdAt: false,
				updatedAt: false,
			},
		});
		console.log("findAll", people);
		return people.map((person) => ({
			...person,
			birthDate: person.birthDate.toISOString(),
		})) as Person[];
	}
}

export { PersonRepositoryPrisma };
