import React from 'react';
import DummyComponent from './DummyComponent.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div>
        <h1>Testing Components</h1>
        <DummyComponent />
      </div>
    );
  }
}

// const App = () => (
//   render() {

//   }
// )

export default App;
