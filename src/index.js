import express from 'express';
import os from 'node:os';

const app = express();

const hostname = 'localhost';
const port = 3001;
const version = '2.0.0';

app.get('/', async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: 'Hello Kubernetes !',
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

app.listen(port, () => {
  console.log(`server listening at: http://${hostname}:${port}`);
});
