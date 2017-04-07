import React, { Component } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Add from 'material-ui/svg-icons/content/add';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class extends Component {
  state = { url: '' };
  
  handleClick = () => {
    const { url } = this.state;
    if (url.length) {
      this.props.onAdd(url);
      this.setState({ url: '' });
    }
  }

  handleChange = (e) => {
    this.setState({ url: e.target.value });
  }
  
  render() {
    return (
      <Card className="AddJob">
        <CardTitle title="Create a Job" />
        <CardText>
          <TextField
            style={{ width: '100%' }}
            className="job-url"
            hintText="Paste your website here for sentiment analisis"
            floatingLabelText="Website url"
            onChange={this.handleChange}
            value={this.state.url}
          />
          <RaisedButton label="Create" onClick={this.handleClick} icon={<Add />} primary />
        </CardText>
      </Card>
    )
  }
}