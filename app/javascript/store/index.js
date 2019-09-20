import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

// initial state
const initialState = {
  frameworks: [],
  submittedVote: false, // figure this out
  voteTotals: [],
  //sorting info
}

// action types
const GET_FRAMEWORKS = 'GET_FRAMEWORKS';
const GET_VOTE_TOTALS = 'GET_VOTE_TOTALS';

// action creators
const getFrameworks = data => ({
  type: GET_FRAMEWORKS,
  data
})

const getVoteTotals = data => ({
  type: GET_VOTE_TOTALS,
  data
})

// thunk creator
export const fetchFrameworks = () => {
  // const frameworks = store.getState().frameworks;
  // console.log(frameworks, '<<< frameworks in store index')
  const headers = {
    headers: {
    }
  }
  return (dispatch) => {
    Promise.all([
      fetch('https://api.github.com/repos/facebook/react', headers).then(f => f.json()),
      fetch('https://api.github.com/repos/angular/angular', headers).then(f => f.json()),
      fetch('https://api.github.com/repos/emberjs/ember', headers).then(f => f.json()),
      fetch('https://api.github.com/repos/vuejs/vue', headers).then(f => f.json())
    ]).then(frameworks => {
      // grab ETag info for each fetch
      // use token...need to config webpack...
      dispatch(getFrameworks(frameworks))
    }).catch(err => {
      console.log('Error:', err);
    });
  }
}

export const fetchVoteTotals = () => {
  return (dispatch) => {
    fetch('/v1/frameworks')
    .then(v => v.json())
    .then(votes => {
      // console.log(JSON.stringify(votes), '<<< votes from frameworks api');
      dispatch(getVoteTotals(votes))
    }).catch(err => {
      console.log('Error:', err);
    });
  }
}

// reducer
function reducer(state = initialState, action) {
  switch(action.type) {
    case GET_FRAMEWORKS:
      return { ...state, frameworks: action.data};
    case GET_VOTE_TOTALS:
      return { ...state, voteTotals: action.data};
    default:
      return state;
  }
}

export default function configureStore() {
  const store = createStore(
    reducer, 
    initialState, 
    applyMiddleware(thunkMiddleware)
  );
  return store;
}

// const store = createStore(
//   reducer, 
//   initialState, 
//   applyMiddleware(thunkMiddleware)
// );

// export default function configureStore() {
//   return store;
// }