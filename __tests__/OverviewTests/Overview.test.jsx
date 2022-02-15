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
import { testStyles, testProduct, testReviewMetaData } from './overviewTestData.js';


// Setup
// Need to make a server
const stylesEndPoint = '/products/:product_id/styles';
const productDetailsEndPoint = '/products/:product_id';
const server = setupServer(
  rest.get(productDetailsEndPoint, (req, res, ctx) => {
    return res(ctx.json(testProduct));
  }),
  rest.get(stylesEndPoint, (req, res, ctx) => {
    return res(ctx.json(testStyles));
  }),

)

// setup server before each test
beforeAll(()=>server.listen())
// after each test reset server
afterEach(()=>server.resetHandlers())
// bring the server down
afterAll(()=>server.close())

/////////////// Tests //////////////////////
test('Shows product slogan and description on click of details', async () => {
  render(<App url="/" />);

  await waitFor(() => screen.getByText('Heir Force Ones'));

  fireEvent.click(screen.getByText('Details +'));

  const detailsText = await waitFor(() => screen.getByRole('product-slogan'));

  expect(detailsText.toHaveTextContent('A sneaker dynasty'));
});