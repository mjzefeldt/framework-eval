import React, { Component, Fragment } from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import PropTypes from "prop-types"
import { Provider } from 'react-redux';
import configureStore from '../store';
// import Header from './Header';
import Dashboard from './Dashboard';
const store = configureStore();

class App extends Component {
  render () {
    return (
      <Fragment>
      <Provider store={store}>
        {/* <Header title="Frameworks Dashboard" /> */}
        <BrowserRouter>
          <Switch>
            {/* <Route exact path="/" render={() => ("Home!")} /> */}
            <Route exact path="/" render={() => <Dashboard greeting="Hi there!"/>} />
          </Switch>
        </BrowserRouter>
      </Provider>
      </Fragment>
    );
  }
}

export default App
