import "dotenv/config";
import express from "express";
import os from "node:os";
import { MongoClient } from "mongodb";
import redis from "redis";

// base config
let config = {
	app_env: process.env.APP_ENV ?? "LOCAL",
	version: process.env.VERSION ?? "LOCAL",
	hostname: "localhost",
	port: process.env.PORT ?? 3001,
	mongodb_url:
		process.env.MONGODB_URL ??
		"mongodb+srv://arijit:QffrRzYEHvCLt7Pv@demo-eks-cluster-1.ldann.mongodb.net/?retryWrites=true&w=majority&appName=demo-eks-cluster-1",
};

// aws secretmanager config
if (process.env.APP_SECRET_PROVIDER === "aws_secretsmanager") {
	const aws_secetsmanager_secret = JSON.parse(process.env.APP_SECRETS);
	config = {
		app_env: aws_secetsmanager_secret.APP_ENV,
		version: aws_secetsmanager_secret.VERSION,
		hostname: "localhost",
		port: aws_secetsmanager_secret.PORT,
		mongodb_url: aws_secetsmanager_secret.MONGODB_URL,
	};
}

// clients
const mongodb_client = new MongoClient(config.mongodb_url);
const redis_client = redis.createClient({
	socket: { host: "localhost", port: 6379 },
	password: "redis-pass",
});

// main
async function main() {
	const app = express();
	await mongodb_client.connect();
	await redis_client.connect();

	// routes
	app.get("/", async (req, res) => {
		try {
			return res.status(200).json({
				success: true,
				message: "Hello k8s !",
				app_env: config.app_env,
				version: config.version,
				os_hostname: os.hostname(),
				arch: os.arch(),
				APP_SECRET_PROVIDER: process.env.APP_SECRET_PROVIDER,
			});
		} catch (error) {
			return res.status(500).json({ success: false, message: error?.message });
		}
	});

	app.get("/nginx", async (req, res) => {
		try {
			const url = "http://nginx:80";
			const response = await fetch(url);
			return res.status(200).send(await response.text());
		} catch (error) {
			return res.status(500).json({ success: false, message: error?.message });
		}
	});

	app.get("/kubes", async (req, res) => {
		try {
			const url = "http://kubes:3002";
			const response = await fetch(url);
			return res.status(200).send(await response.text());
		} catch (error) {
			return res.status(500).json({ success: false, message: error?.message });
		}
	});

	app.get("/mongodb", async (req, res) => {
		try {
			const adminDb = mongodb_client.db().admin();
			const databases = await adminDb.listDatabases();
			const databaseNames = databases.databases.map((db) => db.name);
			return res.status(200).json({ success: true, databases: databaseNames });
		} catch (error) {
			return res.status(500).json({ success: false, message: error?.message });
		}
	});

	app.get("/redis", async (req, res) => {
		try {
			const response = await redis_client.ping();
			return res
				.status(200)
				.json({ success: true, message: "Redis is alive!", response });
		} catch (error) {
			return res.status(500).json({ success: false, message: error?.message });
		}
	});

	app.get("/mongodb/users", async (req, res) => {
		try {
			const database = mongodb_client.db("sample_mflix");
			const collection = database.collection("users");

			const users = await collection.find({}).toArray();

			return res
				.status(200)
				.json({ success: true, message: "users", data: users });
		} catch (error) {
			return res.status(500).json({ success: false, message: error?.message });
		}
	});

	app.listen(config.port, () => {
		console.log(
			`server listening at: http://${config.hostname}:${config.port}`,
		);
	});
}

try {
	main();
} catch (error) {
	console.log("[Error]:", error);
	await mongodb_client.close();
}
