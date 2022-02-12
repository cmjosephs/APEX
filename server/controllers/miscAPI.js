const axios = require('axios');
const API_KEY = require('../config/config.js');
const baseUrl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax';

const options = {
  headers: {
    Authorization: API_KEY
  }
}

module.exports = {
  getCart: (req, res) => {
    axios.get(`${baseUrl}/cart`, options)
    .then((response) => res.status(200).send(response.data))
    .catch((err) => res.status(404).send(err))
  },

  addToCart: (req, res) => {
    axios.post(`${baseUrl}/cart`, req.body, options)
    .then((reponse) => res.sendStatus(201))
    .catch((err) => res.status(404).send(err));
  },

  // Edit after frontend is built out
  logInteractions: (req, res) => {
    // axios.post(`${baseUrl}/interactions`, options)
    // .then(() => res.sendStatus(201))
    // .catch((err) => res.status(500).send(err))
    res.status(500).send('Redo this ajax on backend');
  }
}