const express = require('express');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();
app.use(express.json());

// 1. Load the OpenAPI spec from openapi.yaml
const openapiPath = path.join(__dirname, 'openapi.yaml');
const openapiDocument = YAML.load(openapiPath);

// 2. Serve the docs at /docs so you can see the spec in a browser
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiDocument));

// 3. In-memory "database" of tasks (just an array in memory)
let tasks = [
  { id: '1', title: 'Buy groceries', status: 'PENDING' },
  { id: '2', title: 'Study SDD', status: 'IN_PROGRESS' },
];

// 4. Implement GET /tasks to match the spec
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// 5. Start the server
const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Task API running at http://localhost:${PORT}`);
  console.log(`Docs available at http://localhost:${PORT}/docs`);
});
