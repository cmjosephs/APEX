const axios = require('axios');
const API_KEY = require('../config/config.js');
const baseUrl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax';

const options = {
  headers: {
    Authorization: API_KEY
  }
}

module.exports = {

  getReviewById: (req, res) => {
    axios.get(`${baseUrl}/products/${req.params.product_id}/reviews`, options)
    .then(results => res.status(200).send(results.data))
    .catch(err => res.status(404).send(err));
  },

  addReviewById: (reviewBody) => {
    // axios.post(`${baseUrl}/products/${req.params.product_id}/reviews`, options, req.body)
    // .then(results => res.status(200).send('Added review!'))
    // .catch(err => res.status(404).send(err));
  },

  getMetaData: (req, res) => {
    axios.get(`${baseUrl}/reviews/meta`, options)
    .then(results => res.status(200).send(results.data))
    .catch(err => res.status(404).send(err));
  }

  addHelpfulReview: (req, res) => {
    // axios.put(`${baseUrl}/products/${req.params.product_id}/reviews/${req.params.review_id}/helpful`, options, req.body)
    // .then(results => res.status(200).send('Marked as helpful'))
    // .catch(err => res.status(404).send(err));
  },

  addReportReview: (req, res) => {
    // axios.put(`${baseUrl}/products/${req.params.product_id}/reviews/${req.params.review_id}/report`, options, req.body)
    // .then(results => res.status(200).send('Reported review'))
    // .catch(err => res.status(404).send(err));
  }
}