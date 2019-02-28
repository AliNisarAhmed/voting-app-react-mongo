import React, { Component } from 'react'

import Card from '@material-ui/core/Card';
import { CardHeader, Typography, CardContent, CardActions, Button, withStyles } from '@material-ui/core';
import dayjs from 'dayjs';

class Poll extends Component {
  render() {
    const { name, votes, creator, createdOn, classes } = this.props;
    return (
      <Card className={classes.root}>
        <CardHeader>
          <Typography>
            {name}
          </Typography>
        </CardHeader>
        <CardContent>
          <Typography>
            {votes} votes
          </Typography>
          <Typography>
            {dayjs().diff(createdOn, 'day')} Days Ago
          </Typography>
          <Typography>
            Created by: {creator}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    )
  }
}

const styles = {
  root: {
    width: '100%'
  }
}

export default withStyles(styles)(Poll);
