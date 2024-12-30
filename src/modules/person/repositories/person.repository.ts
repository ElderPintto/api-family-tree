import { prisma } from "@/infra/dataBase/prisma-client.js";
import type {
	Person,
	PersonCreate,
	PersonRepository,
	PersonUpdate,
} from "../interfaces/index.js";

const selectedFields = {
	id: true,
	email: true,
	password: true,
	firstName: true,
	lastName: true,
	gender: true,
	lastNameMother: true,
	lastNameFather: true,
	birthDate: true,
	birthCity: true,
	birthDistrict: true,
	currentCity: true,
	currentDistrict: true,
	createdAt: false,
	updatedAt: false,
};

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
				...selectedFields,
			},
		});
		console.log("findAll", people);
		return people.map((person) => ({
			...person,
			birthDate: person.birthDate.toISOString(),
		})) as Person[];
	}

	async findById(personId: string): Promise<Person | null> {
		const person = await prisma.person.findUnique({
			where: {
				id: personId,
			},
			select: {
				...selectedFields,
			},
		});

		if (!person) {
			return null;
		}

		return {
			...person,
			birthDate: person.birthDate.toISOString(),
		} as Person;
	}

	async update(personId: string, person: PersonUpdate): Promise<Person | null> {
		const updatedPerson = await prisma.person.update({
			where: {
				id: personId,
			},
			data: {
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

		if (!updatedPerson) {
			return null;
		}

		return updatedPerson as unknown as Person;
	}

	async remove(personId: string): Promise<void> {
		await prisma.person.delete({
			where: {
				id: personId,
			},
		});
	}
}

export { PersonRepositoryPrisma };
