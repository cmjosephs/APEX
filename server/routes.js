// const express = require('express');
const router = require('express').Router();
const axios = require('axios');
const API_KEY = require('./config/config.js');
const { products, qA, reviews, miscAPI } = require('./controllers');
// const baseUrl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax';

////////////////////////////// PRODUCTS //////////////////////////////
router.get('/products', products.getAllProducts)
router.get('/products/:product_id', products.getProduct)
router.get('/products/:product_id/styles', products.getStyles)
router.get('/products/:product_id/related', products.getRelated)


////////////////////////////// REVIEWS //////////////////////////////

router.route('/products/:product_id/reviews')
  .get(reviews.getReviewById)
  .post(reviews.addReviewById)

router.route('/products/:product_id/reviews/meta')
  .get(reviews.getMetaData)

router.route('/products/:product_id/reviews/:review_id/helpful')
  .put(reviews.addHelpfulReview)

router.route('/products/:product_id/reviews/:review_id/report')
  .put(reviews.addReportReview)


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
  .get(miscAPI.getCart)
  .post(miscAPI.addToCart)

////////////////////////////// INTERACTIONS //////////////////////////////
router.post('/interactions', miscAPI.logInteractions);


module.exports = router;