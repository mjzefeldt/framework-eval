import React, { Component, Fragment } from "react";
import { Redirect } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

class Header extends Component {
  //to do handle logout
  constructor(props) {
    super(props);
    this.state = {
      loggedin: true,
    }
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  handleLogOut(e) {
    e.preventDefault();
    this.setState({loggedin: false})
    // fetch('/logout', {
    //   // method: 'POST',
    //   headers: { 'Content-Type': 'application/json' }
    //   // body: JSON.stringify(bodyData)
    // }).then(res => {
    //   console.log(res, '<<<loggedout')
    //   // this.props.retrieveVoteTotals();
    // }).catch(err => {
    //   console.log('Error:', err);
    // });
  }

  render () {
    if (this.state.loggedin === false) {
      return <Redirect to="/logout" />
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
