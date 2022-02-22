import React from 'react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter, Router, Routes, Route, Navigate } from 'react-router-dom'
import {createMemoryHistory} from 'history';

import {rest} from 'msw';
import {setupServer} from 'msw/node';

import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  fireEvent,
  getByText,
  getByRole,
} from '@testing-library/react';
// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';
// the component to test
import App from '../../client/src/App.jsx';
// hard coded test data
import { testStyles, testProduct, testReviewMetaData } from './overviewTestData.js';


// Setup
// Need to make a server
const productDetailsEndPoint = '/api/products/:product_id';
const stylesEndPoint = '/api/products/:product_id/styles';
const productMetaData = '/api/products/:product_id/reviews/meta'
const addToBagEndPoint = 'api/cart';
const server = setupServer(
  rest.get(productDetailsEndPoint, (req, res, ctx) => {
    return res(ctx.json(testProduct));
  }),
  rest.get(stylesEndPoint, (req, res, ctx) => {
    return res(ctx.json(testStyles));
  }),
  rest.get(productMetaData, (req, res, ctx) => {
    return res(ctx.json(testReviewMetaData));
  }),
  rest.post(addToBagEndPoint, (req, res, ctx) => {
    return res(ctx.status(201));
  })

)

// setup server before each test
beforeAll(()=>server.listen())
// after each test reset server
afterEach(()=>server.resetHandlers())
// bring the server down
afterAll(()=>server.close())

const renderWithRouter = (ui, {route = '/products/42370'} = {}) => {
  window.history.pushState({}, 'Test page', route)

  return render(ui, {wrapper: BrowserRouter})
}


/////////////// Tests //////////////////////
describe('Product Overview', () => {

  test('Show loading text on first render', async () => {
    const history = createMemoryHistory({initialEntries: ['/products/42370']});
    render(
      <Router location={history.location} navigator={history}>
        <App />
      </Router>
    )

    expect(history.location.pathname).toBe('/products/42370')

    await waitFor(() => screen.getByText('Loading'));
    expect(screen.getByText('Loading')).toBeInTheDocument();
    await waitForElementToBeRemoved(screen.getByText(/Loading/i));
    await waitForElementToBeRemoved(screen.getByText(/Loading*/i));
  });

  beforeEach(async () => {
    renderWithRouter(<App />);
    await waitForElementToBeRemoved(screen.getByText('Loading'));
    await waitForElementToBeRemoved(screen.getByText('Loading...'));
  })

  test('Should display information for a product', async () => {
    expect(screen.getByText(testProduct.name)).toBeInTheDocument();
    expect(screen.getByText(testProduct.category)).toBeInTheDocument();
    expect(screen.getByText('$' + testStyles.results[0].original_price)).toBeInTheDocument();
  });

  xtest('Should show sale price when product is on sale', async () => {
    renderWithRouter(<App />);

    await waitForElementToBeRemoved(screen.getByText('Loading'));
    await waitForElementToBeRemoved(screen.getByText('Loading...'));

    // click event on product that has sale price
    // assertion on sale price

  });

  // xtest('Should render a single photo carousel when screen width is narrow', async () => {});

  // xtest('Should render a photo grid when screen width is wide', async () => {});

  // xtest('Should open a modal when a photo is clicked on', async () => {});

  // test('Photos should change when a different style is clicked on', async () => {});

  // test('Should keep track of the sku when a size is clicked on', async () => {});

  // test('Should submit the sku to API when after a size is selected', async () => {});

  xtest('Shows product slogan and description on click of details', async () => {
    renderWithRouter(<App />);

    await waitFor(() => screen.getByText('Morning Joggers'));

    fireEvent.click(screen.getByText('Details +'));

    const detailsText = await waitFor(() => screen.getByRole('product-slogan'));

    expect(detailsText).toHaveTextContent('Make yourself a morning person');
  });


})