import * as Actions from './actions';

const job = (jobs, action) =>
  jobs.map((job) => {
    if (job.id !== action.id) {
      return job;
    }

    switch (action.type) {
      case Actions.GET_JOB:
        return { ...job, ...action.job };
      default:
        return job;
    }
  })

export default (state = { jobs: [] }, action) => {
  switch (action.type) {
    case Actions.ADD_JOB:
      return { ...state, jobs: [action.job, ...state.jobs] };
    case Actions.GET_JOB:
      return { ...state, jobs: job(state.jobs, action) };
    case Actions.REMOVE_JOB:
      return {
        ...state,
        jobs: state.jobs.filter(
          (job) => job.id !== action.job.id
        )
      }
    default:
      return state;
  }
}

