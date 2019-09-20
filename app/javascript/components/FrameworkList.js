import React, { Component } from "react";
import { Button } from 'semantic-ui-react';
import { Grid, Menu } from 'semantic-ui-react'
class FrameworkList extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   column: null,
    //   data: frameworks,
    //   direction: null,
    // }
  }

  render () {
    const frameWorkList = this.props.frameworks.map((framework) => 
      <Grid.Column key={framework.id}>
        <Menu fluid vertical>
          <Menu.Item className="header">{framework.name}</Menu.Item>
          <Menu.Item>Size: {framework.size}</Menu.Item>
          <Menu.Item>Watchers: {framework.watchers_count}</Menu.Item>
          <Menu.Item>Open Issues: {framework.open_issues_count}</Menu.Item>
          <Menu.Item>Total Votes: {framework.vote_count}</Menu.Item>
          <Menu.Item><Button onClick={(e) => this.props.clickHandler(framework.id, e)}>Vote for {framework.name}</Button></Menu.Item>
        </Menu>
      </Grid.Column>
    );
    return (
      <Grid columns={4} textAlign='center'>
        <Grid.Row stretched>
          {frameWorkList}
        </Grid.Row>
      </Grid>
    )
  }
}

export default FrameworkList
