import type { FastifyTypeInstance } from "@/infra/models/types.fastifyInstace.js";
import { get } from "./get.person.js";
import { getByid } from "./getById.person.js";
import { patch } from "./patch.person.js";
import { post } from "./post.person.js";
import { remove } from "./remove.person.js";

export async function personRoutes(app: FastifyTypeInstance) {
	get(app);
	getByid(app);
	post(app);
	patch(app);
	remove(app);
}
