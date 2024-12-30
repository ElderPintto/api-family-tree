import z from "zod";

enum Gender {
	male = "male",
	female = "female",
	other = "other",
}

export const Person = z.object({
	id: z.string().uuid(),
	email: z.string().email(),
	password: z.string().min(8).max(255),
	firstName: z.string().max(50),
	lastName: z.string().max(80),
	gender: z.nativeEnum(Gender),
	lastNameMother: z.optional(z.string().max(35)),
	lastNameFather: z.optional(z.string().max(35)),
	birthDate: z.string().datetime(),
	birthCity: z.string(),
	birthDistrict: z.string(),
	currentCity: z.string(),
	currentDistrict: z.string(),
});

export const PersonUpdate = Person.omit({
	id: true,
	email: true,
	password: true,
});

export type Person = z.infer<typeof Person>;
export type PersonCreate = Omit<Person, "id">;
export type PersonUpdate = z.infer<typeof PersonUpdate>;

export interface PersonRepository {
	create(data: PersonCreate): Promise<Person>;
	findAll(): Promise<Person[]>;
	findById(personId: string): Promise<Person | null>;
	update(personId: string, person: PersonUpdate): Promise<Person | null>;
	remove(personId: string): Promise<void>;
}
