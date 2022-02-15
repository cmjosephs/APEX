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
    let {page, count} = req.query;
    let {product_id} = req.params;
    axios.get(`${baseUrl}/qa/questions`, {params: {product_id, page, count}, headers: { Authorization: API_KEY}})
    .then((response) => res.status(200).send(response.data))
    .catch((err) => res.status(404).send(err));
  },

  postQuestion: (req, res) => {
    axios.post(`${baseUrl}/qa/questions`, req.body, options)
      .then((respose) => res.status(201).send("Question Sent"))
      .catch((err) => res.status(400).send(err));
  },

  getAnswers: (req, res) => {
    axios.get(`${baseUrl}/qa/questions/${req.params.question_id}/answers`, options)

    .then((response) => res.status(200).send(response.data))
    .catch((err) => res.status(404).send(err))
  },

  postAnswer: (req, res) => {
    axios.post(`${baseUrl}/qa/questions/${req.params.question_id}/answers`, req.body, options)
      .then((response) => res.status(201).send("Answer was Posted"))
      .catch((err) => res.status(404).send(err))
  },

  updateQuestionHelpful: (req, res) => {
    axios.put(`${baseUrl}/qa/questions/${req.params.question_id}/helpful`, req.body, options)
      .then((response) => res.status(204).send("marked helpful"))
      .catch((err) => res.status(404).send(err))
  },

  updateQuestionReport: (req, res) => {
    axios.put(`${baseUrl}/qa/questions/${req.params.question_id}/report`, req.body, options)
      .then((response) => res.status(204).send("Reported Question"))
      .catch((err) => res.status(404).send(err))
  },

  updateAnswerHelpful: (req, res) => {
    axios.put(`${baseUrl}/qa/answers/${req.params.answer_id}/helpful`, req.body, options)
      .then((response) => res.status(204).send("Answer Helpful"))
      .catch((err) => res.status(404).send(err))
  },

  updateAnswerReport: (req, res) => {
    axios.put(`${baseUrl}/qa/answers/${req.params.answer_id}/report)`, req.body, options)
      .then((response) => res.status(204).send(response))
      .catch((err) => res.status(404).send(err))
  },
}