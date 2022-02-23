const axios = require('axios');
const API_KEY = require('../config/config.js');
const baseUrl = require('../config/config.baseURL.js');

const options = {
  headers: {
    Authorization: API_KEY
  }
}

module.exports = {
  getAllProducts: (req, res) => {
    axios.get(`${baseUrl}/products`, options)
    .then((response) => res.status(200).send(response.data))
    .catch((err) => res.status(404).send(err));
  },

  getProduct: (req, res) => {
    axios.get(`${baseUrl}/products/${req.params.product_id}`, options)
    .then((response) => res.status(200).send(response.data))
    .catch((err) => res.status(404).send(err));
  },

  getStyles: (req, res) =>  {
    axios.get(`${baseUrl}/products/${req.params.product_id}/styles`, options)
    .then((response) => res.status(200).send(response.data))
    .catch((err) => res.status(404).send(err));
  },

  getRelated: (req, res) => {
    axios.get(`${baseUrl}/products/${req.params.product_id}/related`, options)
    .then((response) => res.status(200).send(response.data))
    .catch((err) => res.status(404).send(err));
  },
}