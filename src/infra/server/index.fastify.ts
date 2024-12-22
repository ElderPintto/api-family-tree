import { fastifyCors } from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { fastify } from "fastify";
import {
	type ZodTypeProvider,
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";
import { personRoutes } from "../../modules/person/routes/index.js";

export const app = fastify().withTypeProvider<ZodTypeProvider>(); // withTypeProvider is a function that takes a type provider and returns a fastify instance

app.setValidatorCompiler(validatorCompiler); // validatorCompiler is a function that takes a schema and returns a function that validates the request body (client to server)
app.setSerializerCompiler(serializerCompiler); // serializerCompiler is a function that takes a schema and returns a function that serializes the response bodys (server to client)s

app.register(fastifyCors, {
	// cors is a middleware that allows cross-origin requests
	origin: "*",
});

app.register(fastifySwagger, {
	// swagger is a middleware that generates a swagger documentation for the API
	openapi: {
		info: {
			title: "Family Tree API",
			description: "API for managing family trees",
			version: "1.0.0",
			contact: {
				name: "Family Tree API",
				url: "",
				email: "",
			},
		},
	},
	transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
	// swagger-ui is a middleware that generates a swagger-ui for the API
	routePrefix: "/docs",
});

app.register(personRoutes); // register the person routes
