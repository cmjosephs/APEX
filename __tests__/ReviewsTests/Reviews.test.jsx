import React, { useContext } from 'react';
import { reviews, reviewMetaData, productDetails } from './ReviewSampleData.js';
import '@testing-library/jest-dom';
import { BrowserRouter, Router } from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {render, getByText, waitFor, screen, getAllByRole, fireEvent, getByTestId, getByAltText, waitForElementToBeRemoved} from '@testing-library/react';




import ReviewList from '../../client/src/Reviews/ReviewList.jsx';
import { AppContext } from '../../client/src/App.jsx';
import App from '../../client/src/App.jsx';
import ReviewForm from '../../client/src/Reviews/ReviewForm.jsx';
import AllReviews from '../../client/src/Reviews/AllReviews.jsx';

const productDetailsEndPoint = '/api/products/:product_id';
const productMetaData = '/api/products/:product_id/reviews/meta';


const server = setupServer(
  rest.get(productMetaData, (req, res, ctx) => {
    return res(ctx.json(reviewMetaData));
  }),
  rest.get(productDetailsEndPoint, (req, res, ctx) => {
    return res(ctx.json(productDetails));
  }),
  rest.get('/api/products/:product_id/reviews', (req, res, ctx) => {
    return res(ctx.json(reviews))
  }),
)


// setup server before each test
beforeAll(()=>server.listen())
// after each test reset server
afterEach(()=>server.resetHandlers())
// bring the server down
afterAll(()=>server.close())

const renderWithRouter = (ui, {route = '/products/42366'} = {}) => {
  window.history.pushState({}, 'Test page', route)

  return render(ui, {wrapper: BrowserRouter})
}

beforeEach(async () => {
  renderWithRouter(
  <AppContext.Provider value={{ productId: 42366, reviewMetaData, productDetails }}>
    <ReviewList/>
    </AppContext.Provider>);
  // await waitForElementToBeRemoved(screen.getByText('Loading'));
  // await waitForElementToBeRemoved(screen.getByText('Loading...'));
  // await waitForElementToBeRemoved(screen.getByText('Loading reviews...'))
})

describe('Reviews Section', () => {

  test('loads and displays 2 reviews by default', async () => {
    await waitFor(() => screen.getByText('DONT TALK TO ME UNTIL I HAVE HAD COFFEE'))
    await waitFor(() => screen.getByText('This thing is perfect!'))

    expect(screen.getByText('DONT TALK TO ME UNTIL I HAVE HAD COFFEE')).toHaveTextContent('DONT TALK TO ME UNTIL I HAVE HAD COFFEE')
    expect(screen.getByText('This thing is perfect!')).toHaveTextContent('This thing is perfect!')
  })

  test('loads 2 more reviews when clicking more reviews button', async() => {
    const button = await waitFor(() => screen.getByText("More Reviews"));
    fireEvent.click(button)

    await waitFor(() => screen.getByText("This is a Review"))
    await waitFor(() => screen.getByText('oneTwoThree'))

    expect(screen.getByText('This is a Review')).toHaveTextContent('This is a Review')
    expect(screen.getByText('oneTwoThree')).toHaveTextContent('oneTwoThree')
  })

  test('shows if the reviewer recommended this product', async () => {
    const recommendedText = await waitFor(() => screen.getAllByRole('recommended'))
    expect(recommendedText).toBeTruthy();
  })


  test('allows user to mark review as helpful', async () => {
    const helpfulAmount = await waitFor(() => screen.getAllByRole('helpful'))
    fireEvent.click(helpfulAmount[0]);
    expect(helpfulAmount[0]).toBeVisible();

  })

  test('shows how many people found this review helpful', async () => {
    const helpfulAmount = await waitFor(() => screen.getAllByText(/Helpful?/i))
    expect(helpfulAmount).toBeTruthy();

  })

  test('review form modal allows user to write a review', async () => {
    const reviewButton = await waitFor(() => screen.getByRole('write-review'));
    fireEvent.click(reviewButton);
    const reviewBody = await waitFor(() => screen.getByPlaceholderText(/Write your review here/i));
    fireEvent.change(reviewBody, { target: { value: 'test review' } });
    expect(reviewBody.value).toBe('test review');
  });

  test('review form modal allows user to write a review summary', async () => {
    const reviewButton = await waitFor(() => screen.getByRole('write-review'));
    fireEvent.click(reviewButton);
    const reviewSummary = await waitFor(() => screen.getByPlaceholderText(/Review summary here/i));
    fireEvent.change(reviewSummary, { target: { value: 'test' } });
    expect(reviewSummary.value).toBe('test');
  });

  test('allows user to search for reviews', async () => {
    const search = await waitFor(() => screen.getByPlaceholderText('Search reviews...'));
    fireEvent.change(search, { target: { value: 'looking for a review' } });
    expect(search.value).toBe('looking for a review');
  });

  test('allows user to recommend product', async () => {
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

  test('allow user to change fit rating', async() => {
    const reviewButton = await waitFor(() => screen.getByRole('write-review'));
    fireEvent.click(reviewButton);
    const fit = await waitFor(() => screen.getByRole('fit'));
    fireEvent.click(fit)
    expect(fit).not.toHaveAttribute('disabled');
  })

  test('allow user to change comfort rating', async() => {
    const reviewButton = await waitFor(() => screen.getByRole('write-review'));
    fireEvent.click(reviewButton);
    const comfort = await waitFor(() => screen.getByRole('comfort'));
    fireEvent.click(comfort)
    expect(comfort).not.toHaveAttribute('disabled');
  })

  test('allow user to change length rating', async() => {
    const reviewButton = await waitFor(() => screen.getByRole('write-review'));
    fireEvent.click(reviewButton);
    const length = await waitFor(() => screen.getByRole('length-1'));
    fireEvent.click(length)
    expect(length).not.toHaveAttribute('disabled');
  })

  test('allow user to change quality rating', async() => {
    const reviewButton = await waitFor(() => screen.getByRole('write-review'));
    fireEvent.click(reviewButton);
    const quality = await waitFor(() => screen.getByRole('quality-1'));
    fireEvent.click(quality)
    expect(quality).not.toHaveAttribute('disabled');
  })

  test('allow user to submit a review', async() => {
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
    const submitButton = screen.getByText("Submit") // fix
    await fireEvent.click(submitButton);
    expect(submitButton).toBeTruthy();
  })

  test('renders review component', async() => {
    const reviewContainer = await waitFor(() => screen.getByRole('review-container'));
    // fireEvent.click(reviewContainer)
    expect(reviewContainer).toBeInTheDocument();
  })



})






