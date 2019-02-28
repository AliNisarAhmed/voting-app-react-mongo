import React, { Component } from 'react';

import Poll from './Poll';
import { Grid } from '@material-ui/core';

export default class LandingPage extends Component {
  render() {
    const { isLoading, err, data } = this.props;
    return (
      <Grid container spacing={8}>
        {
          isLoading ? 
          <h1>Loading</h1> : (
          err ? 
          <div>Could not load details </div> : (
            data.length === 0 ?
            <h2>No Polls Created yet, be the first</h2> :
            data.map(poll => (
              <Grid item xs={3}>
                <Poll
                  name={poll.name} 
                  votes={poll.votes.length} 
                  creator={poll.creator}
                  createdOn={poll.created_on}
                />
              </Grid>
            ))
          ))
        }
        </Grid>
    )
  }
}
