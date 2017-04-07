import React, { Component } from 'react';
import { connect } from 'react-redux';

import JobsList from './components/JobsList';
import * as Actions from './actions';

import './Jobs.css';

export class Jobs extends Component {
  handleDelete = (job) => this.props.dispatch(Actions.removeJob(job));
  handleAdd = (url) => this.props.dispatch(Actions.addJob(url));
  handleTick = (job) => this.props.dispatch(Actions.getJob(job.id));

  render() {
    const { jobs } = this.props;
    return (
      <JobsList
        jobs={jobs}
        onAdd={this.handleAdd}
        onDelete={this.handleDelete}
        onTick={this.handleTick}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  jobs: state.jobs,
});

export default connect(mapStateToProps)(Jobs);