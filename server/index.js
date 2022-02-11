const express = require('express');
const app = express();
const PORT = 3000;
const router = require('./routes.js');

app.use(express.json());

app.use(express.static('client/dist'));
app.use('/api', router);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));