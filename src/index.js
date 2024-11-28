import express from 'express';
import os from 'node:os';

const app = express();

const hostname = 'localhost';
const port = 3001;

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello Docker !',
    hostname: os.hostname(),
    arch: os.arch(),
    version: '1.0.1',
  });
});

app.listen(port, () => {
  console.log(`server listening at: http://${hostname}:${port}`);
});
