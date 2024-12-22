import { app } from "./infra/server/index.fastify";

const start = async () => {
	try {
		const host = "0.0.0.0";
		const port = process.env.PORT ? Number.parseInt(process.env.PORT) : 3333;

		await app.listen({
			host: host,
			port: port,
		});

		console.log(`Server running at http://${host}:${port}`);
	} catch (err) {
		console.error(err);
		app.log.error(err);
		process.exit(1);
	}
};

start();
