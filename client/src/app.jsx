import React from 'react';
import Product from './Overview/Product.jsx';
import ReviewList from './Reviews/ReviewList.jsx';
import RelatedList from './Related/RelatedList.jsx';
import QAList from './Questions/QAList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // state that holds the current product id
      // current product id review metadata
    };
  }

  // method that updates the current product id and re renders page on change

  render() {
    return (
      <div>
        <h1>FEC Project</h1>
        <Product />
        <RelatedList />
        <QAList />
        <ReviewList />
      </div>
    );
  }
}

export default App;
