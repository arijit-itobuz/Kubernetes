import express from 'express';
import os from 'node:os';
import { MongoClient } from 'mongodb';

const app = express();
const hostname = 'localhost';
const port = process.env.PORT;
const app_env = process.env.APP_ENV;
const version = process.env.VERSION;
const mongodb_url = process.env.MONGODB_URL;
const mongodb_client = new MongoClient(mongodb_url);

await mongodb_client.connect();

async function main() {
  app.get('/', async (req, res) => {
    try {
      return res.status(200).json({
        success: true,
        message: 'Hello Kubernetes !',
        app_env: app_env,
        hostname: os.hostname(),
        arch: os.arch(),
        version: version,
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

  app.get('/mongodb/users', async (req, res) => {
    try {
      const database = mongodb_client.db('sample_mflix');
      const collection = database.collection('users');

      const users = await collection.find({}).toArray();

      return res.status(200).json({ success: true, message: 'users', data: users });
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
