import React, { Component } from 'react';
import './App.css';
import ListDisplay from './components/ListDisplay';
import routes from './Routes';

class App extends Component {
  render() {
    return (
      <div className="App">
        {routes}
      </div>
    );
  }
}

export default App;
