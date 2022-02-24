const axios = require('axios');
require('dotenv').config();
const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.BASE_URL;

const options = {
  headers: {
    Authorization: API_KEY
  }
}

module.exports = {
  getCart: (req, res) => {
    axios.get(`${BASE_URL}/cart`, options)
    .then((response) => res.status(200).send(response.data))
    .catch((err) => res.status(404).send(err))
  },

  addToCart: (req, res) => {
    axios.post(`${BASE_URL}/cart`, req.body, options)
    .then((reponse) => res.sendStatus(201))
    .catch((err) => res.status(404).send(err));
  },

  // Edit after frontend is built out
  logInteractions: (req, res) => {
    axios.post(`${BASE_URL}/interactions`, req.body, options)
    .then(() => res.sendStatus(201))
    .catch((err) => res.status(500).send(err))
    //res.status(500).send('Redo this ajax on backend');
  }
}