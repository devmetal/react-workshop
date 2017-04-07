import axios from 'axios';

export const ADD_JOB = 'ADD_JOB';
export const GET_JOB = 'GET_JOB';
export const REMOVE_JOB = 'REMOVE_JOB';

export const getJob = (id) => (dispatch) => {
  return axios.get(`/api/job/${id}`)
    .then((response) => {
      const { data } = response;
      if (data.error) {
        console.log(data.error);
      }

      dispatch({ type: GET_JOB, job: data, id });
    });
};

export const receiveInfo = (job) => ({ type: GET_JOB, job, id: job.jobId });

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
