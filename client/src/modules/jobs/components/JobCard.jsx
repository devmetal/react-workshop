import React, { Component } from 'react';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import Delete from 'material-ui/svg-icons/action/delete';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

export default class extends Component {
  tinterval = null;

  componentDidMount() {
    const { onTick, job } = this.props;
    this.tinterval = setInterval(() => {
      onTick(job);
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.tinterval);
  }

  render() {
    const { job, onDelete } = this.props;
    return (
      <Card className="JobCard">
        <CardTitle title={`#${job.id}`} />
        {(job.result)
          ? (
            <CardText>
              {job.url}
              <Paper className="info" zDepth={1}>
                <div>Positive Words: {job.result.positive}</div>
              </Paper>
              <Paper className="info" zDepth={1}>
                <div>Negative Words: {job.result.negative}</div>
              </Paper>
            </CardText>
          )
          : (
            <CardText>
              {job.url}
              Ongoing
              </CardText>
            )
        }
        <CardActions>
          <FlatButton
            onClick={() => onDelete(job)}
            label="Delete"
            icon={<Delete />}
            secondary
          />
        </CardActions>
      </Card>
    )
  }
}