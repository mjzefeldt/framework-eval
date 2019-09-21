import React, { Component, Fragment } from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from '../store';
import Header from './Header';
import Dashboard from './Dashboard';
const store = configureStore();

class App extends Component {
  render () {
    return (
      <Fragment>
      <Provider store={store}>
        <BrowserRouter>
          <Header csrfToken={this.props.csrfToken} />
          <Switch>
            <Route exact path="/" render={() => <Dashboard csrfToken={this.props.csrfToken} />} />
          </Switch>
        </BrowserRouter>
      </Provider>
      </Fragment>
    );
  }
}

export default App
