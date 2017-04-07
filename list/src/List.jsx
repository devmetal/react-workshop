import React, { Component } from 'react';

const SentimentItem = (props) =>
  <li>{props.url} - Negative: {props.result.negative} - Positive: {props.result.positive}</li>

export default class extends Component {
  render() {
    const items = this.props.items;
    return (
      <ul>
        {items.map(item => <SentimentItem key={item.jobId} {...item}/>)}
      </ul>
    );
  }
}
