const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs/swagger.json');

const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

module.exports = app;