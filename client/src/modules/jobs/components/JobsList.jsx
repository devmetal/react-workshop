import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';;

import AddJob from './AddJob';
import JobCard from './JobCard';

export default class extends Component {
  render() {
    const { onAdd, onDelete, jobs } = this.props;
    return (
      <Grid className="Jobs" fluid>
        <Row className="jobs-segment">
          <Col xsOffset={2} xs={8}>
            <Row center="xs">
              <Col xs={8}>
                <AddJob onAdd={onAdd} />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xsOffset={2} xs={8}>
            <Row center="xs">
              {jobs.map((job, index) => (
                <Col key={job.id} xs={4}>
                  <JobCard 
                    job={job}
                    onDelete={onDelete}
                  />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Grid>
    )
  }
}