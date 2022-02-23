import React from 'react';

// inport API mocking utilities from  Mock Service Worker
import {rest} from 'msw';
import {setupServer} from 'msw/node';

// import react-testing methods
import {render, getByText, getByRole, waitFor, screen, fireEvent} from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';
// the component to test
import App from '../../client/src/App.jsx';

// hard coded test data
import { testProduct, testRelatedProducts } from './RelatedTestData.js';


// Setup
// Need to make a server
const server = setupServer(
  rest.get('/api/products/:product_id', (req, res, ctx) => {
    return res(ctx.json(testProduct));
  })
  // rest.get('/api/products/:product_id/related', (req, res, ctx) => {
  //   return res(ctx.json(testRelatedProducts))
  // }),
)

// setup server before each test
beforeAll(()=>server.listen())
// after each test reset server
afterEach(()=>server.resetHandlers())
// bring the server down
afterAll(()=>server.close())

/////////////// Tests //////////////////////
test('Shows related products', async () => {
  render(<App url="/" />);

  await waitFor(() => screen.getByText('YEasy 350'));

  expect(screen.getByText('Pumped Up Kicks')).toHaveTextContent('Pumped Up Kicks');
  expect(screen.getByText('YEasy 350')).toHaveTextContent('YEasy 350');
});