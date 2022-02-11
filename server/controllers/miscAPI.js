const axios = require('axios');
const API_KEY = require('../config/config.js');
const baseUrl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax';

const options = {
  headers: {
    Authorization: API_KEY
  }
}

// edit later for AWS cloudfront
module.exports = {
  getCart: (req, res) => {
    // axios.get(`${baseUrl}/cart`, options)
    // .then((response) => res.status(200).send(response.data))
    // .catch((err) => res.status(404).send(err))
  },

  addToCart: (req, res) => {
    // axios.get(`${baseUrl}/cart`, {
    //   sku_id: req.body.sku_id,
    //   headers: {
    //     Authorization: API_KEY
    //   }
    // })
    // .then((reponse) => res.sendStatus(201))
    // .catch((err) => res.status(404).send(err));
  },

  logInteractions: (req, res) => {
    // axios.post(`${baseUrl}/interactions`, options)
    // .then(() => res.sendStatus(201))
    // .catch((err) => res.status(500).send(err))
  }
}