import 'dotenv/config';
import express from 'express';
import os from 'node:os';
import { MongoClient } from 'mongodb';
import redis from 'redis';

// base config
let config = {
  app_env: process.env.APP_ENV ?? 'LOCAL',
  version: process.env.APP_VERSION ?? 'LOCAL',
  hostname: 'localhost',
  port: process.env.APP_PORT ?? 3001,
  mongodb_url:
    process.env.MONGODB_URL ??
    'mongodb+srv://arijit:QffrRzYEHvCLt7Pv@demo-eks-cluster-1.ldann.mongodb.net/?retryWrites=true&w=majority&appName=demo-eks-cluster-1',
  redis_host: process.env.REDIS_HOST,
  redis_port: process.env.REDIS_PORT,
  redis_password: process.env.REDIS_PASSWORD,
};

// aws secretmanager config
if (process.env.APP_SECRET_PROVIDER === 'aws_secretsmanager') {
  console.log('Fetching secrets from AWS Secrets Manager');

  const aws_secetsmanager_secret = JSON.parse(process.env.APP_SECRETS);
  config = {
    app_env: aws_secetsmanager_secret.APP_ENV,
    version: aws_secetsmanager_secret.APP_VERSION,
    hostname: 'localhost',
    port: aws_secetsmanager_secret.APP_PORT,
    mongodb_url: aws_secetsmanager_secret.MONGODB_URL,
    redis_host: aws_secetsmanager_secret.REDIS_HOST,
    redis_port: aws_secetsmanager_secret.REDIS_PORT,
    redis_password: aws_secetsmanager_secret.REDIS_PASSWORD,
  };
}

// clients
const mongodb_client = new MongoClient(config.mongodb_url);
const redis_client = redis.createClient({
  socket: { host: config.redis_host, port: config.redis_port },
  password: config.redis_password,
});

// router to define API routes
const k8sRouter = express.Router();

k8sRouter.get('/', async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: 'Hello k8s !',
      app: {
        app_secret_provider: process.env.APP_SECRET_PROVIDER ?? 'N/A',
        app_env: config.app_env,
        app_version: config.version,
        os_hostname: os.hostname(),
        arch: os.arch(),
        KUBERNETES_DEPLOYMENT_VERSION: process.env.KUBERNETES_DEPLOYMENT_VERSION ?? 'N/A',
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error?.message });
  }
});

k8sRouter.get('/nginx', async (req, res) => {
  try {
    const url = 'http://nginx:80';
    const response = await fetch(url);
    return res.status(200).send(await response.text());
  } catch (error) {
    return res.status(500).json({ success: false, message: error?.message });
  }
});

k8sRouter.get('/kubes', async (req, res) => {
  try {
    const url = 'http://kubes:3002/kubes';
    const response = await fetch(url);
    return res.status(200).send(await response.text());
  } catch (error) {
    return res.status(500).json({ success: false, message: error?.message });
  }
});

k8sRouter.get('/mongodb', async (req, res) => {
  try {
    const adminDb = mongodb_client.db().admin();
    const databases = await adminDb.listDatabases();
    const databaseNames = databases.databases.map((db) => db.name);
    return res.status(200).json({ success: true, databases: databaseNames });
  } catch (error) {
    return res.status(500).json({ success: false, message: error?.message });
  }
});

k8sRouter.get('/redis', async (req, res) => {
  try {
    const response = await redis_client.ping();
    return res.status(200).json({ success: true, message: 'Redis is alive!', response });
  } catch (error) {
    return res.status(500).json({ success: false, message: error?.message });
  }
});

k8sRouter.get('/mongodb/users', async (req, res) => {
  try {
    const database = mongodb_client.db('sample_mflix');
    const collection = database.collection('users');

    const users = await collection.find({}).toArray();

    return res.status(200).json({ success: true, message: 'users', data: users });
  } catch (error) {
    return res.status(500).json({ success: false, message: error?.message });
  }
});

// main
async function main() {
  const app = express();
  await mongodb_client.connect();
  await redis_client.connect();

  // use the API router at /api
  app.use('/k8s', k8sRouter);

  app.listen(config.port, () => {
    console.log(`server listening at: http://${config.hostname}:${config.port}`);
  });
}

try {
  main();
} catch (error) {
  console.log('[Error]:', error);
  await mongodb_client.close();
}
