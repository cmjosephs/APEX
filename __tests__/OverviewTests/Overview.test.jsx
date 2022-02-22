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
test('Show loading text on first render', async () => {
  // render page w router and contexts
  const history = createMemoryHistory({initialEntries: ['/products/42370']});
  // history.push('/products/42370');
  render(
    <Router location={history.location} navigator={history}>
      <App />
    </Router>
  )
  expect(history.location.pathname).toBe('/products/42370')
  // renderWithRouter(
  //   // <Routes>
  //   //   <Route path='/products/:product_id' element={<App />} />
  //   // </Routes>
  //   <App />
  // )
  // renderWithRouter(
  //   // <Routes>
  //   //   <Route path='/products/:product_id' element={<App />} />
  //   // </Routes>
  //   act(() => (<App />))
  // );
  // check if App is loading
  await waitFor(() => screen.getByText('Loading'));
  expect(screen.getByText('Loading')).toBeInTheDocument();
  await waitForElementToBeRemoved(screen.getByText('Loading'));
  await waitForElementToBeRemoved(screen.getByText('Loading...'));
});






test('Should display title for a product', async () => {
  // render page w router and contexts
  renderWithRouter(<App />);

  // waits for second render
  await waitForElementToBeRemoved(screen.getByText('Loading'));
  await waitForElementToBeRemoved(screen.getByText('Loading...'));
  // await waitFor(screen.getByText('Heir Force Ones'));

  // check if title is in document
  expect(screen.getByText('Heir Force Ones')).toBeInTheDocument();
});












// test('Should show sale price when product is on sale', async () => {});

// test('Should render a single photo carousel when screen width is narrow', async () => {});

// test('Should render a photo grid when screen width is wide', async () => {});

// test('Should open a modal when a photo is clicked on', async () => {});

// test('Photos should change when a different style is clicked on', async () => {});

// test('Should keep track of the sku when a size is clicked on', async () => {});

// test('Should submit the sku to API when after a size is selected', async () => {});

// test('Shows product slogan and description on click of details', async () => {
//   render(<App url="/products/42370" />);

//   await waitFor(() => screen.getByText('Heir Force Ones'));

//   fireEvent.click(screen.getByText('Details +'));

//   const detailsText = await waitFor(() => screen.getByRole('product-slogan'));

//   expect(detailsText).toHaveTextContent('A sneaker dynasty');
// });
