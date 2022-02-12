const axios = require('axios');
const API_KEY = require('../config/config.js');
const baseUrl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax';

const options = {
  headers: {
    Authorization: API_KEY
  }
};

module.exports = {

  getReviewById: (req, res) => {
    let { count, sort, page } = req.query;
    let { product_id } = req.params;

    axios.get(`${baseUrl}/reviews`,
    { params: { product_id, sort, count },
      headers: { Authorization: API_KEY }
    })
    .then(results => res.status(200).send(results.data))
    .catch(err => res.status(404).send(err));
  },

  addReviewById: (req, res) => {
    let { product_id } = req.params;

    axios.post(`${baseUrl}/reviews`, req.body,
    { params: { product_id },
      headers: { Authorization: API_KEY }
    })
    .then(results => res.status(200).send('Added review!'))
    .catch(err => res.status(404).send(err));
  },

  getMetaData: (req, res) => {
    axios.get(`${baseUrl}/reviews/meta`,
    {params: {product_id: req.params.product_id},
    headers: { Authorization: API_KEY}})
    .then(results => res.status(200).send(results.data))
    .catch(err => res.status(404).send(err));
  },

  addHelpfulReview: (req, res) => {
    axios.put(`${baseUrl}/reviews/${req.params.review_id}/helpful`, req.body, options)
    .then(results => res.status(204).send('Marked as helpful'))
    .catch(err => res.status(404).send(err));
  },

  addReportReview: (req, res) => {
    axios.put(`${baseUrl}/reviews/${req.params.review_id}/report`, req.body, options)
    .then(results => res.status(200).send('Reported review'))
    .catch(err => res.status(404).send(err));
  }
}