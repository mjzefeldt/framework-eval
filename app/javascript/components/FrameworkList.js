import React, { Component, Fragment } from "react";
import { Grid, Menu, Button, Image, List, Icon } from 'semantic-ui-react'
class FrameworkList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rankAttr: '',
      ranking: [10270250, 24195339, 83110007, 11730342],
    }
  }
  handleRanking = (attr) => {
    const ranking = [];
    this.props.frameworks.sort((a, b) => (a[attr] > b[attr]) ? 1 : -1).forEach(f => ranking.push(f.id));
    this.setState({
      rankAttr: attr,
      ranking
    })
  }

  render () {
    const frameWorkList = this.props.frameworks.map((framework) => 
      <Grid.Column key={framework.id} className="col-wrapper">
        <Menu fluid vertical>
          <Menu.Item className="header col-header-style">
            <h2 className="col-header-text">{framework.name}</h2>
          </Menu.Item>
          <Menu.Item>
            <div className="sm-label">Forks Count</div>
            <div className="data">{framework.forks_count}</div>
          </Menu.Item>
          <Menu.Item>
            <div className="sm-label">Watchers</div>
            <div className="data">{framework.watchers_count}</div>
          </Menu.Item>
          <Menu.Item>
            <div className="sm-label">Open Issues</div>
            <div className="data">{framework.open_issues_count}</div>
          </Menu.Item>
          <Menu.Item>
            <div className="sm-label">Total Votes</div>
            <div className="data">{framework.vote_count}</div>
          </Menu.Item>
          <Menu.Item>
            <Button 
              inverted 
              color="green" 
              onClick={(e) => this.props.clickHandler(framework.id, e)}
              disabled={this.props.userVoted}
            >
              Vote for {framework.name}
            </Button>
          </Menu.Item>
        </Menu>
      </Grid.Column>
    );
    const rankingSelector = (
      <List selection verticalAlign='middle' className="list-flex">
        <List.Item onClick={() => this.handleRanking('forks_count')} >
          <Icon name="fork" />
          <List.Content>
            <List.Header>Forks Count</List.Header>
          </List.Content>
        </List.Item>
        <List.Item onClick={() => this.handleRanking('watchers_count')} >
        <Icon name="eye" />
          <List.Content>
            <List.Header>Watchers</List.Header>
          </List.Content>
        </List.Item>
        <List.Item onClick={() => this.handleRanking('open_issues_count')} >
          <Icon name="exclamation circle" />
          <List.Content>
            <List.Header>Open Issues</List.Header>
          </List.Content>
        </List.Item>
        <List.Item onClick={() => this.handleRanking('vote_count')} >
          <Icon name="winner" />
          <List.Content>
            <List.Header>Total Votes</List.Header>
          </List.Content>
        </List.Item>
      </List>
    )
    return (
      <Fragment>
        <h3>Sort Frameworks</h3>
        {rankingSelector}
        <Grid stackable columns={4} textAlign='center'>
          <Grid.Row stretched>
            {frameWorkList}
          </Grid.Row>
        </Grid>
      </Fragment>
    )
  }
}

export default FrameworkList
