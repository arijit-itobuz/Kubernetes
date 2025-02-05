import 'dotenv/config';
import express from 'express';
import os from 'node:os';

let config = {
  app_env: process.env.APP_ENV ?? 'LOCAL',
  version: process.env.APP_VERSION ?? 'LOCAL',
  hostname: 'localhost',
  port: process.env.PORT ?? 3002,
};

if (process.env.APP_SECRET_PROVIDER === 'aws_secretsmanager') {
  console.log('Fetching secrets from AWS Secrets Manager');

  const aws_secetsmanager_secret = JSON.parse(process.env.APP_SECRETS);
  config = {
    app_env: aws_secetsmanager_secret.APP_ENV,
    version: aws_secetsmanager_secret.APP_VERSION,
    hostname: 'localhost',
    port: aws_secetsmanager_secret.APP_PORT,
  };
}

async function main() {
  const app = express();

  // routes
  app.get('/', async (req, res) => {
    try {
      return res.status(200).json({
        success: true,
        message: 'Hello kubes !',
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

  app.listen(config.port, () => {
    console.log(`server listening at: http://${config.hostname}:${config.port}`);
  });
}

try {
  main();
} catch (error) {
  console.log('[Error]:', error);
}
