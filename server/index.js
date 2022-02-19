const express = require('express');
const app = express();
const PORT = 3000;
const router = require('./routes.js');
const path = require('path');

app.use(express.json());

app.use(express.static('client/dist'));
app.use('/api', router);
app.get('/products/*', (req, res) => {
  res.sendFile('index.html', {root:path.join(__dirname, '../client/dist')})
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));