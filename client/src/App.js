import React, { Component } from 'react';
import { AppBar } from './components';
import { Jobs } from './modules/jobs';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar />
        <Jobs />
      </div>
    );
  }
}

export default App;
