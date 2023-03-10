import express, { Application } from "express";
import { json } from "body-parser";
import { executableSchema as schema } from "./graphql/schema";
import { ApolloServer } from "apollo-server-express";
import { PORT } from "./env";

export default class App {
	public app: Application;
	public port: number;

	constructor() {
		this.app = express();
		this.port = PORT;
		this.initializeMiddlewares();
		this.initializeApollo();
	}

	private initializeMiddlewares() {
		this.app.use(json());
	}

	private async initializeApollo() {
		const server = new ApolloServer({
			schema,
			context: (req) => ({
				req: req.req,
				res: req.res,
			}),
		});

		this.app.get("/", (_, res) => {
			res.status(200).send("OK");
		});
		await server.start();

		server.applyMiddleware({ app: this.app });
	}
	public listen() {
		this.app.listen(this.port, () => {
			console.log(`App listening on the port ${this.port}`);
		});
	}
}
