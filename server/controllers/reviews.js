const axios = require('axios');
// const API_KEY = require('../config/config.js');
// const BASE_URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax';
require('dotenv').config();
const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.BASE_URL;

const options = {
  headers: {
    Authorization: API_KEY
  }
};

module.exports = {

  getReviewById: (req, res) => {
    let { count, sort, page } = req.query;
    let { product_id } = req.params;

    axios.get(`${BASE_URL}/reviews`,
    { params: { product_id, sort, count },
      headers: { Authorization: API_KEY }
    })
    .then(results => res.status(200).send(results.data))
    .catch(err => res.status(404).send(err));
  },

  addReviewById: (req, res) => {
    let { product_id } = req.params;

    axios.post(`${BASE_URL}/reviews`, req.body,
    {
      params: { product_id },
      headers: { Authorization: API_KEY }
    })
    .then(results => res.status(200).send('Added review!'))
    .catch(err => res.status(404).send(err));
  },

  getMetaData: (req, res) => {
    axios.get(`${BASE_URL}/reviews/meta`,
    {params: {product_id: req.params.product_id},
    headers: { Authorization: API_KEY}})
    .then(results => res.status(200).send(results.data))
    .catch(err => res.status(404).send(err));
  },

  addHelpfulReview: (req, res) => {
    axios.put(`${BASE_URL}/reviews/${req.params.review_id}/helpful`, req.body, options)
    .then(results => res.status(204).send('Marked as helpful'))
    .catch(err => res.status(404).send(err));
  },

  addReportReview: (req, res) => {
    axios.put(`${BASE_URL}/reviews/${req.params.review_id}/report`, req.body, options)
    .then(results => res.status(200).send('Reported review'))
    .catch(err => res.status(404).send(err));
  }
}