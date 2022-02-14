const express = require('express');
const app = express();
const router = require('./routes.js');
const PORT = 3000;

app.use(express.json());

app.use(express.static('client/dist'));
app.use('/api', router);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));