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
  getAllProducts: (req, res) => {
    axios.get(`${BASE_URL}/products`, options)
    .then((response) => res.status(200).send(response.data))
    .catch((err) => res.status(404).send(err));
  },

  getProduct: (req, res) => {
    axios.get(`${BASE_URL}/products/${req.params.product_id}`, options)
    .then((response) => res.status(200).send(response.data))
    .catch((err) => res.status(404).send(err));
  },

  getStyles: (req, res) =>  {
    axios.get(`${BASE_URL}/products/${req.params.product_id}/styles`, options)
    .then((response) => res.status(200).send(response.data))
    .catch((err) => res.status(404).send(err));
  },

  getRelated: (req, res) => {
    axios.get(`${BASE_URL}/products/${req.params.product_id}/related`, options)
    .then((response) => res.status(200).send(response.data))
    .catch((err) => res.status(404).send(err));
  },
}