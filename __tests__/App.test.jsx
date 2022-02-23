// import React from 'react';

// // inport API mocking utilities from  Mock Service Worker
// import {rest} from 'msw';
// import {setupServer} from 'msw/node';

// // import react-testing methods
// import {render, getByText, waitFor, screen} from '@testing-library/react';

// // add custom jest matchers from jest-dom
// import '@testing-library/jest-dom';
// // the component to test
// import App from '../client/src/App.jsx';

// // Setup
// // Need to make a server
// const route = '/';

// const server = setupServer(
//   rest.get(route, (req, res, ctx) => {
//     return res(ctx.json({app: 'Testing Components'}))
//   }),
// )

// // setup server before each test
// beforeAll(()=>server.listen())
// // after each test reset server
// afterEach(()=>server.resetHandlers())
// // bring the server down
// afterAll(()=>server.close())

// test('loads and displays header', async () => {
//   // Renders the component
//   render(<App url="/" />)

//   await waitFor(() => screen.getByText('Testing Components'))

//   expect(screen.getByText('Testing Components')).toHaveTextContent('Testing Components')
// })