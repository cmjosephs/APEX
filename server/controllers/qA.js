const axios = require('axios');
const API_KEY = require('../config/config.js');
const baseUrl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax';

const options = {
  headers: {
    Authorization: API_KEY
  }
}

module.exports = {
  getQuestions: (req, res) => {
    axios.get(`${baseUrl}/qa/questions`, {params: {product_id: req.params.product_id}, headers: { Authorization: API_KEY}})
    .then((response) => res.status(200).send(response.data))
    .catch((err) => res.status(404).send(err));
  },

  // postQuestion: (req, res) => {
  //   axios.post(`${baseUrl}/qa/questions`, options, req.body)
  //     .then((respose) => res.status(201).send("Question was Posted"))
  //     .catch((err) => res.status(400).send(err));
  // },

  getAnswers: (req, res) => {
    axios.get(`${baseUrl}/qa/questions/${req.params.question_id}/answers`, options)
    .then((response) => res.status(200).send(response.data))
    .catch((err) => res.status(404).send(err))
  },

  // postAnswer: (req, res) => {
  //   axios.post(`${baseUrl}/qa/questions/${req.params.id}/answers`, options, req.body)
  //     .then((response) => res.status(201).send("Answer was Posted"))
  //     .catch((err) => res.status(404).send(err))
  // },

  // updateQuestionHelpful: (req, res) => {
  //   axios.put(`${baseUrl}/qa/questions/${req.params.id}/helpful)`, options, req.body)
  //     .then((response) => res.status(200).send(response))
  //     .catch((err) => res.status(404).send(err))
  // },

  // updateQuestionReport: (req, res) => {
  //   axios.put(`${baseUrl}/qa/questions/${req.params.id}/report)`, options, req.body)
  //     .then((response) => res.status(200).send(response))
  //     .catch((err) => res.status(404).send(err))
  // },

  // updateAnswerHelpful: (req, res) => {
  //   axios.put(`${baseUrl}/qa/answers/${req.params.id}/helpful)`, options, req.body)
  //     .then((response) => res.status(200).send(response))
  //     .catch((err) => res.status(404).send(err))
  // },

  // updateAnswerReport: (req, res) => {
  //   axios.put(`${baseUrl}/qa/answers/${req.params.id}/report)`, options, req.body)
  //     .then((response) => res.status(200).send(response))
  //     .catch((err) => res.status(404).send(err))
  // },
}