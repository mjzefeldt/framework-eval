import React, { Component, Fragment } from "react";
import { Button } from 'semantic-ui-react';
import { Grid, Menu } from 'semantic-ui-react'
class FrameworkList extends Component {
  constructor(props) {
    super(props);
  }
  // to do: if can't sort - how about rank by property?

  render () {
    // const order = (o = this.state.sort) => (framework) => (o.map((o, i) => {
    //   <Menu.Item key={i}>{`${framework}.${o}`}</Menu.Item>
    // }
    // ))
    // const order = (o = this.state.sort) => (framework) => (o.map((o, i) => {
    //   <div>{`${framework}.${o}`}</div>
    // }
    // ))
    const frameWorkList = this.props.frameworks.map((framework) => 
      <Grid.Column key={framework.id} className="col-wrapper">
        <Menu fluid vertical>
          <Menu.Item className="header col-header-style">
            <h2 className="col-header-text">{framework.name}</h2>
          </Menu.Item>
          {/* {order(framework)} */}

          <Menu.Item>
              <div className="sm-label">
                Size 
              </div>
              <div className="data">
                {framework.size}
              </div>
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
          <Menu.Item><Button inverted color="green" onClick={(e) => this.props.clickHandler(framework.id, e)}>Vote for {framework.name}</Button></Menu.Item>
        </Menu>
      </Grid.Column>
    );
    return (
      <Grid stackable columns={4} textAlign='center'>
        <Grid.Row stretched>
          {frameWorkList}
        </Grid.Row>
      </Grid>
    )
  }
}

export default FrameworkList
