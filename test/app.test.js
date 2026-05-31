const request = require('supertest');
const app = require('../src/app');

describe('API básica de la práctica CI/CD', () => {
  test('GET / devuelve información del servicio', async () => {
    const response = await request(app).get('/');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('service', 'agile-devops-practica');
    expect(response.body).toHaveProperty('status', 'ok');
  });

  test('GET /health devuelve estado healthy', async () => {
    const response = await request(app).get('/health');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ status: 'healthy' });
  });
});
