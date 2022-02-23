import React, {useContext} from 'react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {render, getByText, waitFor, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import QAList from '../../client/src/Questions/QAList.jsx';
import {questions, testProduct, testReviewMetaData, answers} from './testData.js';
import App from '../../client/src/App.jsx';
import AppContext from '../../client/src/App.jsx';

const productDetailsEndPoint = '/api/products/:product_id';
const productMetaData = '/api/products/:product_id/reviews/meta'

const server = setupServer(
  rest.get(productMetaData, (req, res, ctx) => {
    return res(ctx.json(testReviewMetaData));
  }),
  rest.get(productDetailsEndPoint, (req, res, ctx) => {
    return res(ctx.json(testProduct));
  }),
  rest.get('/api/products/:product_id/qa/questions', (req, res, ctx) => {
    return res(ctx.json(questions))
  }),
  rest.get('/api/products/:product_id/qa/questions/:question_id/answers', (req, res, ctx) => {
    return res(ctx.json(answers))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('load and displays 2 questions by default', async () => {
  render(<App/>)

  await waitFor(() => screen.getByText('added 2nd question'))
  await waitFor(() => screen.getByText("Why is this product cheaper here than other sites?"))

  expect(screen.getByText('added 2nd question')).toHaveTextContent('added 2nd question')
  expect(screen.getByText("Why is this product cheaper here than other sites?")).toHaveTextContent("Why is this product cheaper here than other sites?")
})

test('Search bar placeholder text appears on render', async () => {
  render(<App/>)

  await waitFor(() => screen.getByPlaceholderText("Have a question? Search for answers..."))

  expect(screen.getByPlaceholderText("Have a question? Search for answers...")).toHaveAttribute("placeholder");
})

test('1 answers to display', async () => {
  render(<App/>)

  await waitFor(() => screen.getAllByText('This product is overstocked here!'))

  expect(screen.getAllByText('This product is overstocked here!')[0]).toHaveTextContent('This product is overstocked here!')
})

test('Question Form Opens', async () => {
  render(<App/>)

  const button = screen.getByText("Add Question +");

  await fireEvent.click(button);

  expect(screen.getByPlaceholderText("Enter your question here...")).toHaveAttribute("placeholder");
})

test('Question form changes', async () => {
  render(<App/>)

  const button = screen.getByText("Add Question +");

  await fireEvent.click(button);
  const questionBodyInput = screen.getByPlaceholderText("Enter your question here...")
  await fireEvent.change(questionBodyInput, {target: {value: "How well does this wash?"}})

  expect(questionBodyInput).toHaveTextContent("How well does this wash?");
})

test('Question form submit button submits question', async () => {
  render(<App/>)

  const button = screen.getByText("Add Question +");

  await fireEvent.click(button);
  const questionBodyInput = screen.getByPlaceholderText("Enter your question here...")
  await fireEvent.change(questionBodyInput, {target: {value: "How well does this wash?"}})
  const questionNameInput = screen.getByPlaceholderText("Example: Jack123")
  await fireEvent.change(questionNameInput, {target: {value: "AN123"}})
  const questionEmailInput = screen.getByPlaceholderText("Example: jack@email.com")
  await fireEvent.change(questionEmailInput, {target: {value: "AN@email.com"}})

  const submitButton = screen.getByText("Submit")
  await fireEvent.click(submitButton);
  //await waitFor(() => screen.getByText("How well does this wash?"))

  expect(screen.getByText("How well does this wash?")).toHaveTextContent("How well does this wash?");
})



test('Answer form input changes', async () => {
  render(<App/>)

  await waitFor(() => screen.getByText('added 2nd question'))
  const button = screen.getAllByText("Add Answer")[0];

  await fireEvent.click(button);
  const answerBodyInput = screen.getByPlaceholderText("Enter your answer here...")
  await fireEvent.change(answerBodyInput, {target: {value: "Holds very well, washed several times"}})

  expect(answerBodyInput).toHaveTextContent("Holds very well, washed several times");
})

test('Answer form cancel button', async () => {
  render(<App/>)

  await waitFor(() => screen.getByText('added 2nd question'))
  const button = screen.getAllByText("Add Answer")[0];

  await fireEvent.click(button);
  const cancelButton = screen.getByText("Cancel")
  const log = await fireEvent.click(cancelButton)


  expect(log).toBe(true);
})

test('More questions renders 2 more questions', async () => {
  render(<App/>)

  await waitFor(() => screen.getByText('added 2nd question'))
  const button = screen.getByText("More Questions");
  await fireEvent.click(button);
  await waitFor(() => screen.getByText("Where is this product made?"))


  expect(screen.getByText("Where is this product made?")).toHaveTextContent("Where is this product made?");
})

