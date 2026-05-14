const express = require('express');
const app = express();
app.get('/', (req, res) => res.json({ status: 'ok' }));
app.get('/health', (req, res) => res.json({ healthy: true }));
app.listen(3000, () => console.log('Server on port 3000'));
