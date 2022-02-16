import React from 'react';
import reviews from './ReviewSampleData.js';

import {rest} from 'msw';
import {setupServer} from 'msw/node';

import {render, getByText, waitFor, screen, getAllByRole} from '@testing-library/react';

import '@testing-library/jest-dom';

import ReviewList from '../../client/src/Reviews/ReviewList.jsx'


const server = setupServer(
  rest.get('api/products/:product_id/reviews', (req, res, ctx) => {
    return res(ctx.json(reviews))
  }),
)

// setup server before each test
beforeAll(()=>server.listen())
// after each test reset server
afterEach(()=>server.resetHandlers())
// bring the server down
afterAll(()=>server.close())


test('loads and displays 2 reviews by default', async () => {
  render(<ReviewList />)

  await waitFor(() => screen.getByText('DONT TALK TO ME UNTIL I HAVE HAD COFFEE'))
  await waitFor(() => screen.getByText('This thing is perfect!'))

  expect(screen.getByText('DONT TALK TO ME UNTIL I HAVE HAD COFFEE')).toHaveTextContent('DONT TALK TO ME UNTIL I HAVE HAD COFFEE')
  expect(screen.getByText('This thing is perfect!')).toHaveTextContent('This thing is perfect!')
})

test('shows if the reviewer recommended this product', async () => {
  render(<ReviewList />)

  const recommendedText = await waitFor(() => screen.getAllByRole('recommended'))

  expect(recommendedText).toBeInTheDocument
})

// test('shows how many people found this review helpful', async () => {
//   render(<ReviewList/>)

//   await waitFor(() => screen.getByText('DONT TALK TO ME UNTIL I HAVE HAD COFFEE'))

//   expect(screen.getByText('DONT TALK TO ME UNTIL I HAVE HAD COFFEE')).toHaveTextContent('27')
// })