import React, {useContext} from 'react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {render, getByText, waitFor, screen} from '@testing-library/react';
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