import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { fetchFrameworks, fetchVoteTotals } from '../store';
// import { Button } from 'semantic-ui-react';

class Dashboard extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      // filters: {},
    }
    this.handleVoteClick = this.handleVoteClick.bind(this);
  }

  componentDidMount() {
    this._isMounted = true; // if this then make call...
    this.props.retrieveFrameworks();
    this.props.retrieveVoteTotals();
  }

  componentWillUnmount() {
    this._isMounted = false; 
  }

  handleVoteClick(e) {
    const bodyData = {framework: {id: 10270250}};

    e.preventDefault();
    console.log('hitting handleVoteClick');
    fetch('/v1/frameworks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyData)
    }).then(res => {
      console.log(JSON.stringify(res), '<<<res from post');
    }).catch(err => {
      console.log('Error:', err);
    });
  }

  render () {
    console.log(this.props.voteTotals, '<<< voteTotals')
    const frameworks = this.props.frameworks;

    const frameWorkList = frameworks.map((framework) => 
      <div key={framework.id} className="single-f-wrapper">
        <div>{framework.id}</div>
        <div>{framework.name}</div>
        <div>Size: {framework.size}</div>
        <div>Watchers: {framework.watchers_count}</div>
        <div>Open Issues: {framework.open_issues_count}</div>
        <div>Total Votes: {framework.vote_total}</div>
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
          <button type="button" onClick={this.handleVoteClick}>Vote</button>
        </div>
      </Fragment>
    );
  }
}

const mapState = state => ({
  frameworks: state.frameworks,
  voteTotals: state.voteTotals
});

const mapDispatch = dispatch => ({
  retrieveFrameworks: () => dispatch(fetchFrameworks()),
  retrieveVoteTotals: () => dispatch(fetchVoteTotals())
});

Dashboard.propTypes = {
  greeting: PropTypes.string
};

// export default Dashboard
export default connect(mapState, mapDispatch)(Dashboard);
