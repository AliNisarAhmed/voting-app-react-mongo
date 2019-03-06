import React, { Component } from 'react'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { IconButton } from '@material-ui/core';

class Nav extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Link to="/">
              LOGO
            </Link>
            <InputBase 
              placeholder="Search..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}  
            />
            {
              this.props.auth ? (
              <div>
                <IconButton 
                  // aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  // onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </div>
              ) : (
                <Link to="/login">Login</Link>
              )
            }
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

const styles = {
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
};

export default withStyles(styles)(Nav);
