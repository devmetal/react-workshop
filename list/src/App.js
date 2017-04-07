import React, { Component } from 'react';
import axios from 'axios';
import ListComponent from './List';

class App extends Component {
  state = { items: [] };

  componentDidMount() {
    axios.get('/api/job').then((response) => {
      const data = response.data;
      this.setState({ items: data });
    })
  }

  render() {
    return (
      <div className="App">
        <ListComponent items={this.state.items} />
      </div>
    );
  }
}

export default App;
