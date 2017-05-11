import React, { Component } from 'react';

const SentimentItem = (props) =>
  <li>{props.url} - Negative: {props.result.negative} - Positive: {props.result.positive}</li>

const InProgressItem = (props) =>
  <li>{props.url} - Its still progress</li>

export default class extends Component {
  render() {
    const items = this.props.items;
    return (
      <ul>
        {items.map(item => 
          (item.done) ? 
            <SentimentItem key={item.jobId} {...item}/> : 
            <InProgressItem key={item.jobId} {...item} />
        )}
      </ul>
    );
  }
}
