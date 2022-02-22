import React from 'react';
import { reviews, reviewMetaData, productDetails } from './ReviewSampleData.js';

import {rest} from 'msw';
import {setupServer} from 'msw/node';

import {render, getByText, waitFor, screen, getAllByRole, fireEvent, getByTestId, getByAltText} from '@testing-library/react';

import '@testing-library/jest-dom';

import ReviewList from '../../client/src/Reviews/ReviewList.jsx';
import AppContext from '../../client/src/App.jsx';
import App from '../../client/src/App.jsx';
import ReviewForm from '../../client/src/Reviews/ReviewForm.jsx'

const productDetailsEndPoint = '/api/products/:product_id';
const productMetaData = '/api/products/:product_id/reviews/meta';


const server = setupServer(
  rest.get(productMetaData, (req, res, ctx) => {
    return res(ctx.json(reviewMetaData));
  }),
  rest.get(productDetailsEndPoint, (req, res, ctx) => {
    return res(ctx.json(productDetails));
  }),
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
  render(<App/>)
  await waitFor(() => screen.getByText('DONT TALK TO ME UNTIL I HAVE HAD COFFEE'))
  await waitFor(() => screen.getByText('This thing is perfect!'))

  expect(screen.getByText('DONT TALK TO ME UNTIL I HAVE HAD COFFEE')).toHaveTextContent('DONT TALK TO ME UNTIL I HAVE HAD COFFEE')
  expect(screen.getByText('This thing is perfect!')).toHaveTextContent('This thing is perfect!')
})

test('loads 2 more reviews when clicking more reviews button', async() => {
  render(<App/>)
  const button = await waitFor(() => screen.getByText("More Reviews"));
  fireEvent.click(button)

  await waitFor(() => screen.getByText("This is a Review"))
  await waitFor(() => screen.getByText('oneTwoThree'))

  expect(screen.getByText('This is a Review')).toHaveTextContent('This is a Review')
  expect(screen.getByText('oneTwoThree')).toHaveTextContent('oneTwoThree')
})

test('shows if the reviewer recommended this product', async () => {
  render(<App />)
  const recommendedText = await waitFor(() => screen.getAllByRole('recommended'))
  expect(recommendedText).toBeTruthy();
})

test('shows how many people found this review helpful', async () => {
  render(<App/>)
  const helpfulAmount = await waitFor(() => screen.getAllByRole('helpful'))
  expect(helpfulAmount).toBeTruthy();

})

test('allows user to mark review as helpful', async () => {
  render(<App/>)
  const helpfulAmount = await waitFor(() => screen.getAllByRole('helpful'))
  fireEvent.click(helpfulAmount[0]);
  expect(helpfulAmount[0]).toBeVisible();

})

test('review form modal allows user to write a review', async () => {
  render(<App/>)
  const reviewButton = await waitFor(() => screen.getByRole('write-review'));
  fireEvent.click(reviewButton);
  const reviewBody = await waitFor(() => screen.getByPlaceholderText(/Write your review here/i));
  fireEvent.change(reviewBody, { target: { value: 'test review' } });
  expect(reviewBody.value).toBe('test review');
});

test('review form modal allows user to write a review summary', async () => {
  render(<App/>)
  const reviewButton = await waitFor(() => screen.getByRole('write-review'));
  fireEvent.click(reviewButton);
  const reviewSummary = await waitFor(() => screen.getByPlaceholderText(/Review summary here/i));
  fireEvent.change(reviewSummary, { target: { value: 'test' } });
  expect(reviewSummary.value).toBe('test');
});


test('allows user to search for reviews', async () => {
  render(<App/>)
  const search = await waitFor(() => screen.getByPlaceholderText('Search reviews...'));
  fireEvent.change(search, { target: { value: 'looking for a review' } });
  expect(search.value).toBe('looking for a review');
});


test('allows user to recommend product', async () => {
  render(<App/>)
  const reviewButton = await waitFor(() => screen.getByRole('write-review'));
  fireEvent.click(reviewButton);
  const recommend = await waitFor(() => screen.getByPlaceholderText("Do you recommend this product?"))
  fireEvent.change(recommend, {
    target: {
      value: "true"
    }
  } );
  expect(recommend.value).toBe("true");
})

test('change fit rating', async() => {
  render(<App/>)
  const reviewButton = await waitFor(() => screen.getByRole('write-review'));
  fireEvent.click(reviewButton);
  const fit = await waitFor(() => screen.getByRole('fit'));
  fireEvent.click(fit)
  expect(fit).not.toHaveAttribute('disabled');

})

test('change comfort rating', async() => {
  render(<App/>)
  const reviewButton = await waitFor(() => screen.getByRole('write-review'));
  fireEvent.click(reviewButton);
  const comfort = await waitFor(() => screen.getByRole('comfort'));
  fireEvent.click(comfort)
  expect(comfort).not.toHaveAttribute('disabled');
})


test('change length rating', async() => {
  render(<App/>)
  const reviewButton = await waitFor(() => screen.getByRole('write-review'));
  fireEvent.click(reviewButton);
  const length = await waitFor(() => screen.getByRole('length-1'));
  fireEvent.click(length)
  expect(length).not.toHaveAttribute('disabled');
})

test('change quality rating', async() => {
  render(<App/>)
  const reviewButton = await waitFor(() => screen.getByRole('write-review'));
  fireEvent.click(reviewButton);
  const quality = await waitFor(() => screen.getByRole('quality-1'));
  fireEvent.click(quality)
  expect(quality).not.toHaveAttribute('disabled');
})


test('allow user to submit a review', async() => {
  render(<App/>)
  const reviewButton = await waitFor(() => screen.getByRole('write-review'));
  fireEvent.click(reviewButton);
  const rating = await waitFor(() => screen.getByPlaceholderText('rating'));
  fireEvent.click(rating)
  const recommend = await waitFor(() => screen.getByPlaceholderText("Do you recommend this product?"))
  fireEvent.change(recommend, {
    target: {
      value: "true"
    }
  });
  const fit = await waitFor(() => screen.getByRole('fit'));
  fireEvent.click(fit);
  const comfort = await waitFor(() => screen.getByRole('comfort'));
  fireEvent.click(comfort);
  const quality = await waitFor(() => screen.getByRole('quality-1'));
  fireEvent.click(quality);
  const length = await waitFor(() => screen.getByRole('length-1'));
  fireEvent.click(length)
  const nickname = await waitFor(() => screen.getByPlaceholderText(/Nickname/i));
  fireEvent.change(nickname, { target: { value: 'nickname' } });
  const reviewSummary = await waitFor(() => screen.getByPlaceholderText(/Review summary here/i));
  fireEvent.change(reviewSummary, { target: { value: 'test' } });
  const reviewBody = await waitFor(() => screen.getByPlaceholderText(/Write your review here/i));
  fireEvent.change(reviewBody, { target: { value: 'test review' } });
  const submitButton = screen.getByText("Submit")
  await fireEvent.click(submitButton);
  expect(submitButton).toBeTruthy();
})



