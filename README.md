# APEX eCommerce

### Details
APEX ecommerce is a web app that lets users interact with a specified product and view all of its details. The primary widgets used for this page are a product overview, related products, Q & A, and reviews section. This app was built with React 17.x and Node 16.x.

### Installation
After forking and cloning the repo, use npm to install dependencies
```bash
npm install
```
### Environment
Create a .env file in the root directory and add a base url, github API token, and desired server port. The exact structure can be found in env-example.js.

### Start the app
Run webpack to bundle files
```bash
npm run react-dev
```
Start the server
```bash
npm run server
```

## Features

![Page](./client/dist/images/APEX-product.gif "Product page")

### Product Overivew
- Have full view of images of current product
- Clickable photos that show an expanded modal view
- Customize product style and size
- Add to cart
- Responsive UI for desktop and mobile

### Recommendations/Related Products
- Displays all realted products
- Click on image and modal opens to compare current product
- Click on a recommend image and redirects the page to that product
- Add current product to favorites

### Questions and Answers
- Displays questions and answers on render
- Search for questions
- Add a question or answer
- Mark a question and/or answer helpful

### Ratings and Reviews
- Displays the average reviews and all reviews
- Sort by stars/newest/helpfulness
- Search for reviews
- Add a review

## Contributors
[Chris Josephs] (https://github.com/cmjosephs)
[Kevin Kimchii] (https://github.com/kevinhwkim)
Alexandria Norvani
[Tiffany Vu] (https://github.com/tiffanyyv)