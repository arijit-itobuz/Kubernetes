import 'dotenv/config';
import express from 'express';
import os from 'node:os';
import { MongoClient } from 'mongodb';

let config = {
  app_env: process.env.APP_ENV,
  version: process.env.VERSION,
  hostname: 'localhost',
  port: process.env.PORT,
  mongodb_url: process.env.MONGODB_URL,
};

if (process.env.APP_SECRET_PROVIDER === 'aws_secretsmanager') {
  const aws_secetsmanager_secret = JSON.parse(process.env.APP_SECRETS);
  config = {
    app_env: aws_secetsmanager_secret.APP_ENV,
    version: aws_secetsmanager_secret.VERSION,
    hostname: 'localhost',
    port: aws_secetsmanager_secret.PORT,
    mongodb_url: aws_secetsmanager_secret.MONGODB_URL,
  };
}

const app_env = config.app_env;
const version = config.version;
const hostname = config.hostname;
const port = config.port;
const mongodb_url = config.mongodb_url;

const app = express();
const mongodb_client = new MongoClient(mongodb_url);

await mongodb_client.connect();

async function main() {
  app.get('/', async (req, res) => {
    try {
      return res.status(200).json({
        success: true,
        message: 'Hello kubes !',
        app_env: app_env,
        version: version,
        hostname: os.hostname(),
        arch: os.arch(),
        APP_SECRET_PROVIDER: process.env.APP_SECRET_PROVIDER,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error?.message });
    }
  });

  app.get('/nginx', async (req, res) => {
    try {
      const url = 'http://nginx:80';
      const response = await fetch(url);
      return res.status(200).send(await response.text());
    } catch (error) {
      return res.status(500).json({ success: false, message: error?.message });
    }
  });

  app.get('/k8s', async (req, res) => {
    try {
      const url = 'http://k8s:3001';
      const response = await fetch(url);
      return res.status(200).send(await response.text());
    } catch (error) {
      return res.status(500).json({ success: false, message: error?.message });
    }
  });

  app.get('/mongodb/users', async (req, res) => {
    try {
      const database = mongodb_client.db('sample_mflix');
      const collection = database.collection('users');

      const users = await collection.find({}).toArray();

      return res
        .status(200)
        .json({ success: true, message: 'users', data: users });
    } catch (error) {
      return res.status(500).json({ success: false, message: error?.message });
    }
  });

  app.listen(port, () => {
    console.log(`server listening at: http://${hostname}:${port}`);
  });
}

try {
  main();
} catch (error) {
  console.log('[Error]:', error);
  await mongodb_client.close();
}
