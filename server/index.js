const express = require('express');
const app = express();
const router = require('./routes.js');
const path = require('path');
const PORT = 3000;

app.use(express.json());

app.use(express.static('client/dist'));
app.use('/api', router);


// app.get('/', (req, res) => {
//   res.redirect('/products/42366');
// });
// app.get('/products', (req, res) => {
//   res.redirect('/products/42366');
// });
app.get('/products/*', (req, res, next) => {
  res.sendFile('index.html', {root: path.join(__dirname, '../client/dist')})
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));