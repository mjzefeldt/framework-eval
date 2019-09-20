import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
// import PropTypes from "prop-types";
import { fetchFrameworks, fetchVoteTotals } from '../store';
import FrameworkList from './FrameworkList';

class Dashboard extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      //sessionFrameworkVote: '', // figure this out
      //voteOnceWarning: false, // figure this out
    }
    this.handleVoteClick = this.handleVoteClick.bind(this);
  }

  componentDidMount() {
    this._isMounted = true; // if this then make call...
    this.props.retrieveFrameworks();
    this.props.retrieveVoteTotals();
    // this.dataPolling = setInterval(() => { // start data polling
    //   this.props.retrieveFrameworks();
    //   }, 10000
    // );
  }

  componentWillUnmount() {
    this._isMounted = false;
    // clearInterval(this.dataPolling); // stop data polling
  }

  handleVoteClick(id, e) {
    // e.target.value // or something like that - take in id of element passing in
    const bodyData = {framework: {id}}; //id: 10270250
    // console.log(e, '<<<e')
    e.preventDefault();
    // console.log('hitting handleVoteClick');
    fetch('/v1/frameworks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyData)
    }).then(res => {
      // console.log(JSON.stringify(res), '<<<res from post');
      this.props.retrieveVoteTotals(); // refresh vote_totals...
      // this.setState({session_vote: })
    }).catch(err => {
      console.log('Error:', err);
    });
  }

  render () {
    let frameworks = this.props.frameworks; // let frameworks = [] as default;
    if (this.props.frameworks.length && this.props.voteTotals.length) {
      frameworks = this.props.frameworks.reduce((acc, cur) => {
        const newObj = {
          id: cur.id,
          name: cur.name,
          size: cur.size,
          watchers_count: cur.watchers_count,
          open_issues_count: cur.open_issues_count
        }
        const countObj = this.props.voteTotals.find(f => f.framework_id === cur.id);
        countObj.vote_total? newObj['vote_count'] = countObj.vote_total : newObj['vote_count'] = 0;
        acc.push(newObj);
        return acc;
      }, []);
    }
    return (
      <Fragment>
        <div className="dashboard-container">
          {frameworks.length < 1 && <h1>LOADING...</h1>}
          <div className="frameworks-container">
            <FrameworkList 
              frameworks={frameworks}
              clickHandler={this.handleVoteClick}
            />
          </div>
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

// Dashboard.propTypes = {
//   greeting: PropTypes.string
// };

export default connect(mapState, mapDispatch)(Dashboard);
