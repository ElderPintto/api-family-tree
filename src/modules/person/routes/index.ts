/* import { getByid } from "./getById.person.js";
import { put } from "./put.person.js";
import { patch } from "./patch.person.js";
import { remove } from "./remove.person.js"; */
import type { FastifyTypeInstance } from "@/infra/models/types.fastifyInstace.js";
import { get } from "./get.person.js";
import { post } from "./post.person.js";

export async function personRoutes(app: FastifyTypeInstance) {
	get(app);
	post(app);
	/*getByid(app);
  put(app);
  patch(app);
  remove(app); */
}
