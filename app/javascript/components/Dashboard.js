import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { fetchFrameworks, fetchVoteTotals } from '../store';
import { Portal, Segment, Button } from 'semantic-ui-react'
import FrameworkList from './FrameworkList';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userVoted: false,
      open: false, // voted modal
    }
    this.handleVoteClick = this.handleVoteClick.bind(this);
  }

  componentDidMount() {
    this._isMounted = true; 
    this.props.retrieveFrameworks();
    this.props.retrieveVoteTotals();

    fetch('/v1/frameworks/check_vote', { // check_vote
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }})
      .then(v => v.json())
      .then((voted) => {
        if (voted == true) {
          this.setState({userVoted: true});
        } else {
          return;
        } 
      })
      .catch(err => {
      console.log('Error:', err);
    });
    this.dataPolling()
  }

  dataPolling = () => { setInterval(() => { // start data polling
    this.props.retrieveFrameworks();
    }, 60000
  )};

  componentWillUnmount() {
    clearInterval(this.dataPolling); // stop data polling
  }

  handleVoteClick(id, e) {
    e.preventDefault();
    if (!this.state.userVoted) {
      const bodyData = {
        framework: {id},
        authenticity_token: this.props.csrfToken
      };
      fetch('/v1/frameworks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData)
      }).then(() => {
        this.props.retrieveVoteTotals();
        this.setState({
          userVoted: true,
          open: true
        });
      }).catch(err => {
        console.log('Error:', err);
      });
    }
  }

  handleClose = () => this.setState({ open: false })
  handleOpen = () => this.setState({ open: true })

  render () {
    let frameworks = this.props.frameworks; // let frameworks = [] as default;
    if (this.props.frameworks.length > 0 && this.props.voteTotals.length > 0) {
      // frameworks = this.props.frameworks.reduce((acc, cur) => {
      frameworks = frameworks.reduce((acc, cur) => {
        const newObj = {
          id: cur.id,
          name: cur.name,
          forks_count: cur.forks_count,
          watchers_count: cur.watchers_count,
          open_issues_count: cur.open_issues_count
        }
        const countObj = this.props.voteTotals.find(f => f.framework_id === cur.id);
        countObj.hasOwnProperty('vote_total')? newObj['vote_count'] = countObj.vote_total : newObj['vote_count'] = 0;
        acc.push(newObj);
        return acc;
      }, []);
    }

    const voteMsg = ( <div>No further voting this session.</div>)
    return (
      <div className="dashboard-container">
        {frameworks.length < 1 && <h1>LOADING...</h1>}
        <Portal onClose={this.handleClose} open={this.state.open}>
          <Segment
            style={{
              left: '40%',
              position: 'fixed',
              top: '50%',
              zIndex: 1000,
            }}
          >
            <div className="modal-layout">
              <p>Thanks for voting for a framework.</p>
              <p>You can vote again during a future login session.</p>
              <Button
                content='Close'
                negative
                onClick={this.handleClose}
              />
            </div>
          </Segment>
        </Portal>
        <div className="frameworks-container">
          <FrameworkList 
            frameworks={frameworks}
            clickHandler={this.handleVoteClick}
            userVoted={this.state.userVoted}
          />
        </div>
        {this.state.userVoted && voteMsg}
      </div>
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

export default connect(mapState, mapDispatch)(Dashboard);
