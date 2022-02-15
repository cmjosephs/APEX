import React from 'react';

// inport API mocking utilities from  Mock Service Worker
import {rest} from 'msw';
import {setupServer} from 'msw/node';

// import react-testing methods
import {render, getByText, getByRole, waitFor, screen, fireEvent} from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';
// the component to test
import Info from '../../client/src/Overview/Info.jsx';
import App from '../../client/src/App.jsx';


// Setup
// Need to make a server
const route = '/';
const server = setupServer(
  rest.get(route, (req, res, ctx) => {
    return res(ctx.json({app: ''}))
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