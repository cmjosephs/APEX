const axios = require('axios');
const API_KEY = require('../config/config.js');
const baseUrl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax';

const options = {
  headers: {
    Authorization: API_KEY
  }
}

module.exports = {
  getAllQuestions: (req, res) => {
    axios.get(`${baseUrl}/products/${req.params.id}`)
    .then((response) => res.status(200).send(response.data))
    .catch((err) => res.status(404).send(err));
  },

  getProduct: (req, res) => {
    axios.get(`${baseUrl}/products/:product_id`, options)
    .then
  },
}