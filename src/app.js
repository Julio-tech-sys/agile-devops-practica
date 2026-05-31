const express = require('express');

const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
  res.status(200).json({
    service: 'agile-devops-practica',
    status: 'ok',
    message: 'Pipeline CI/CD académico operativo'
  });
});

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'healthy' });
});

module.exports = app;
