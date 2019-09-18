import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// initial state
const initialState = {
  frameworks: [],
  submittedVote: false,
  voteTotals: [],
  //sorting info
}

// action types
const GET_FRAMEWORKS = 'GET_FRAMEWORKS';

// action creators
const getFrameworks = data => ({
  type: GET_FRAMEWORKS,
  data
})

// thunk creator
export const fetchFrameworks = () => {
  return (dispatch) => {
    Promise.all([
      fetch('https://api.github.com/repos/facebook/react').then(f => f.json()),
      fetch('https://api.github.com/repos/angular/angular').then(f => f.json()),
      fetch('https://api.github.com/repos/emberjs/ember').then(f => f.json()),
      fetch('https://api.github.com/repos/vuejs/vue').then(f => f.json())
    ]).then(frameworks => {
      console.log(JSON.stringify(frameworks), '<<<frameworks in thunk before dispatch');
      // grab ETag info for each fetch
      dispatch(getFrameworks(frameworks))
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
    default:
      return state;
  }
}

export default function configureStore() {
  const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(
      applyMiddleware(
        thunkMiddleware
      )
    )
  );
  return store;
}