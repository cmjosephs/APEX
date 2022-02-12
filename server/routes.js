// const express = require('express');
const router = require('express').Router();
const axios = require('axios');
const API_KEY = require('./config/config.js');
const { products, qA, reviews, miscAPI } = require('./controllers');
const baseUrl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax';
// const products = '/product/:product_id'; // maybe use later to clean up

////////////////////////////// PRODUCTS //////////////////////////////
router.get('/products', products.getAllProducts)
router.get('/products/:product_id', products.getProduct)
router.get('/products/:product_id/styles', products.getStyles)
router.get('/products/:product_id/related', products.getRelated)


////////////////////////////// REVIEWS //////////////////////////////

router.route('/products/:product_id/reviews')
  // .get(`${baseUrl}/reviews`) // api get
  // .post(`${baseUrl}/reviews`) // post review to AWS - EDIT LATER
// take care of callback or promises after
router.route('/products/:product_id/reviews/meta')
  // .get(`${baseUrl}/reviews/meta/`)

router.route('/products/:product_id/reviews/:review_id/helpful')
  // .put(`${baseUrl}/reviews/:review_id/helpful`)

router.route('/products/:product_id/reviews/:review_id/report')
  // .put(`${baseUrl}/reviews/:review_id/report`)


////////////////////////////// QUESTIONS & ANSWERS //////////////////////////////
//router.get('/products/:product_id/qa/questions', qA.getQuestions)
router.route('/products/:product_id/qa/questions')
  .get(qA.getQuestions)
  .post(qA.postQuestion)

router.route('/products/:product_id/qa/questions/:question_id/answers')
  .get(qA.getAnswers)
  .post(qA.postAnswer)

router.route('/products/:product_id/qa/questions/:question_id/helpful')
  .put(qA.updateQuestionHelpful)

router.route('/products/:product_id/qa/questions/:question_id/report')
  .put(qA.updateQuestionReport)

router.route('/products/:product_id/qa/answers/:answer_id/helpful')
  .put(qA.updateAnswerHelpful)

router.route('/products/:product_id/qa/answers/:answer_id/report')
  .put(qA.updateAnswerReport)


////////////////////////////// CART //////////////////////////////
router.route('/cart')
  // .get(`${baseUrl}/cart`)
  // .post(`${baseUrl}/cart`)

////////////////////////////// INTERACTIONS //////////////////////////////
router.route('/interactions')
  // .post(`${baseUrl}/interactions`)


module.exports = router;