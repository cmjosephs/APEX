// import React from 'react';

// import {rest} from 'msw';
// import {setupServer} from 'msw/node';

// import {render, getByText, waitFor, screen} from '@testing-library/react';

// import '@testing-library/jest-dom';

// import ReviewList from '../../client/src/Reviews/ReviewList.jsx'

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

