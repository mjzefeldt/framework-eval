import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

// initial state
const initialState = {
  frameworks: [],
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

const headers = {
  method: 'GET',
  headers: {  
    'Authorization': `token ${process.env.GITHUB_TOKEN_SECRET}`,
    'Content-Type': 'application/json'
  }
}

// thunk creator 
export const fetchFrameworks = () => {
  return (dispatch) => {
    Promise.all([
      fetch('https://api.github.com/repos/facebook/react', headers).then(f => f.json()),
      fetch('https://api.github.com/repos/angular/angular', headers).then(f => f.json()),
      fetch('https://api.github.com/repos/emberjs/ember', headers).then(f => f.json()),
      fetch('https://api.github.com/repos/vuejs/vue', headers).then(f => f.json())
    ]).then(frameworks => {
      const filteredFrameworksRes = frameworks.reduce((acc, cur) => {
        if (cur.hasOwnProperty('message')) {
          return acc;
        } else {
          acc.push(cur);
          return acc;
        }     
      }, []);

      dispatch(getFrameworks(filteredFrameworksRes));
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
