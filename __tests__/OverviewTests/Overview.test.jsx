import React from 'react';
import { BrowserRouter, Router } from 'react-router-dom'
import { createMemoryHistory } from 'history';

import {rest} from 'msw';
import {setupServer} from 'msw/node';

import { act } from 'react-dom/test-utils';
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  fireEvent,
  getByText,
  getByRole,
  getByAltText,
  getAllByRole,
  getByLabelText,
  findByTestId,
  within
} from '@testing-library/react';
// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';
// the component to test
import App from '../../client/src/App.jsx';
import Product from '../../client/src/Overview/Product.jsx';
import { AppContext } from '../../client/src/App.jsx';
// hard coded test data
import { testStyles, testProduct, testReviewMetaData, exampleContext } from './overviewTestData.js';

// Setup
// Need to make a server
const productDetailsEndPoint = '/api/products/:product_id';
const stylesEndPoint = '/api/products/:product_id/styles';
const productMetaData = '/api/products/:product_id/reviews/meta'
const addToBagEndPoint = '/api/cart';
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

const renderWithRouter = (ui, {route = '/products/42368'} = {}) => {
  window.history.pushState({}, 'Test page', route)

  return render(ui, {wrapper: BrowserRouter})
}

beforeEach(async () => {
  renderWithRouter(
    <AppContext.Provider value={exampleContext} >
      <Product />
    </AppContext.Provider>
  );
  // await waitForElementToBeRemoved(screen.getByText('Loading'));
  await waitForElementToBeRemoved(screen.getByText('Loading...'));
})


/////////////// Tests //////////////////////
describe('Product Overview', () => {

  test('Should display information for a product', async () => {
    expect(screen.getByText(testProduct.name)).toBeInTheDocument();
    expect(screen.getByText(testProduct.category)).toBeInTheDocument();
    expect(screen.getByText('$' + testStyles.results[0].original_price)).toBeInTheDocument();
  });

  test('Should show sale price when product is on sale', async () => {
    fireEvent.click(screen.getByAltText('Goldenrod'));
    const salePrice = await waitFor(() => screen.getByText('$35.00'));
    expect(salePrice).toBeInTheDocument();
  });

  test('Should open a modal when a photo is clicked on', async () => {
    fireEvent.click(screen.getByAltText('1'));
    const button = await waitFor(() => screen.getByRole('button', {name: 'X'}));
    expect(button).toBeVisible();
  });

  test('Should change scroll the modal photo', async () => {

    fireEvent.click(screen.getByAltText(0));
    await waitFor(() => screen.getByTestId('modal-photo-0'));
    const img1 = screen.getByTestId('modal-photo-0');
    fireEvent.click(screen.getByTestId('scroll-right'));
    await waitFor(() => screen.getByTestId('modal-photo-1'));
    const img2 = screen.getByTestId('modal-photo-1');

    expect(img2).toBe(img1)
  });

  test('Photos should change when a different style is clicked on', async () => {
    const originalStyle = screen.getByText('Black')
    fireEvent.click(screen.getByAltText('Maroon'))
    const newStyle = await screen.findByTestId('selected-style-name');
    expect(newStyle.textContent).toBe('Maroon');
  });

  test('Should change selected size when size is clicked on', async () => {
    fireEvent.click(screen.getByLabelText('L'));
    const clickedSize = await waitFor(() => screen.getByLabelText('L'));
    expect(clickedSize).not.toHaveAttribute('disabled');
  });

  test('Shows product slogan on click of details', async () => {
    fireEvent.click(screen.getByText('Details +'));
    const detailsText = await waitFor(() => screen.getByTestId('product-slogan'));
    expect(detailsText).toHaveTextContent('Make yourself a morning person');
  });

  test('Show product features on click of features', async () => {
    fireEvent.click(screen.getByText('Features +'));

    const featText = await waitFor(() => {
      screen.getByTestId('features');
    });

    expect(screen.getByText(/Fabric*/i)).toBeInTheDocument();
  });

});