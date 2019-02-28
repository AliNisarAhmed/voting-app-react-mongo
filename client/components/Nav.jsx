import React, { Component } from 'react'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

class Nav extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit">
                <Link to="/">LOGO</Link> 
            </Typography>
            <InputBase 
              placeholder="Search..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}  
            />
            <Button><Link to="/login">Login</Link></Button>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    width: '100%',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    color: 'red',
  }
})

export default withStyles(styles)(Nav);
