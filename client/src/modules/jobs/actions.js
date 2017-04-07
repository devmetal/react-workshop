import axios from 'axios';

export const ADD_JOB = 'ADD_JOB';
export const GET_JOB = 'GET_JOB';
export const REMOVE_JOB = 'REMOVE_JOB';

export const receiveInfo = (job) => ({
  type: GET_JOB,
  id: job.jobId ,
  job,
});

export const addJob = (url) => (dispatch) => {
  return axios.post('/api/job', { data: { url } })
    .then((response) => {
      const { id } = response.data;
      dispatch({ type: ADD_JOB, job: { url, id } });
    });
};

export const removeJob = (job) => ({
  type: REMOVE_JOB, job
});
