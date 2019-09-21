import React, { Component, Fragment } from "react";
import { Redirect } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedin: true,
    }
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  handleLogOut(e) {
    e.preventDefault();
    fetch('/sign_out', {
      method: 'GET', // not restful - revisit when revisit use of devise
      headers: { 'Content-Type': 'application/json' }
    }).then(res => {
      this.setState({loggedin: false})
    }).catch(err => {
      console.log('Error:', err);
    });
  }

  render () {
    if (this.state.loggedin === false) {
      return <Redirect to="/login" />
    }
    return (
      <Fragment>
        <header className="header-wrapper">
          <h1 className="header-text">Framework Evaluator</h1>
          <div>
            <Button onClick={this.handleLogOut}>Logout</Button>
          </div>
        </header>
      </Fragment>
    );
  }
}

export default Header
