const axios = require('axios');
const API_KEY = require('../config/config.js');
const baseUrl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax';

const options = {
  headers: {
    Authorization: API_KEY
  }
}

module.exports = {

  getReview: (req, res) => {
    axios.get(`${baseUrl}/products/${req.params.id}/reviews`, options)
    .then(results => res.status(200).send(results.data))
    .catch(err => res.status(404).send(err));
  },

  addReview: (req, res) => {
    axios.post()
  }
}