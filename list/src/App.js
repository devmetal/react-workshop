import React, { Component } from 'react';
import ListComponent from './List';
import analysis from './firebase';

class App extends Component {
  state = { items: [] };

  componentDidMount() {
    analysis.on('child_added', (data) => {
      const id = data.key;
      const job = data.val();
      const item = { ...job, id };
      this.addJob(item);
    })

    analysis.on('child_changed', (data) => {
      const id = data.key;
      const job = data.val();
      const item = { ...job, id };
      this.updateJob(item);
    });

    analysis.on('child_removed', (data) => {
      const id = data.key;
      this.removeJob(id);
    });
  }

  addJob(job) {
    this.setState({ items: [ job, ...this.state.items ] });
  }

  updateJob(job) {
    this.setState({ items: this.state.items.map((item) => {
      if (item.id !== job.id) {
        return item;
      }
      return {...item, ...job};
    })})
  }

  removeJob(id) {
    this.setState({ items: this.state.items.filter(item => item.id !== id) });
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
