import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { fetchFrameworks } from '../store';
// import { Button } from 'semantic-ui-react';

class Dashboard extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      // filters: {},
    }
  }

  componentDidMount() {
    this._isMounted = true; // if this then make call...
    this.props.retrieveFrameworks();
  }

  componentWillUnmount() {
    this._isMounted = false; 
  }

  render () {
    const frameworks = this.props.frameworks;
    const frameWorkList = frameworks.map((framework) => 
      <div key={framework.id} className="single-f-wrapper">
        <div>{framework.name}</div>
        <div>{framework.size}</div>
        <div>{framework.watchers_count}</div>
        <div>{framework.open_issues_count}</div>
      </div> 
    );
    return (
      <Fragment>
        <div className="dashboard-container">
          {this.props.greeting}
          {frameworks.length < 1 && <h1>LOADING...</h1>}
          <div className="frameworks-container">
            {frameWorkList}
          </div>
          {/* <Button>Vote</Button> */}
        </div>
      </Fragment>
    );
  }
}

const mapState = state => ({
  frameworks: state.frameworks
});

const mapDispatch = dispatch => ({
  retrieveFrameworks: () => dispatch(fetchFrameworks())
});

Dashboard.propTypes = {
  greeting: PropTypes.string
};

// export default Dashboard
export default connect(mapState, mapDispatch)(Dashboard);
