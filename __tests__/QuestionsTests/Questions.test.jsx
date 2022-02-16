import React from 'react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {render, getByText, waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import QAList from '../../client/src/Questions/QAList.jsx';
import questions from './testData.js';

const server = setupServer(
  rest.get('/api/products/:product_id/qa/questions', (req, res, ctx) => {
    return res(ctx.json(questions))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('load and displays 2 questions by default', async () => {
  render(<QAList/>)

  await waitFor(() => screen.getByText('What fabric is the bottom made of?'))
  //await waitFor(() => screen.getByText("Why is this product cheaper here than other sites?"))

  expect(screen.getByText('What fabric is the bottom made of?')).toHaveTextContent('What fabric is the bottom made of?')
  //expect(screen.getByText("Why is this product cheaper here than other sites?")).toHaveTextcontent("Why is this product cheaper here than other sites?")
})