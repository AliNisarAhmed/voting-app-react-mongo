import React, { Component } from 'react'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { IconButton, Menu, MenuItem } from '@material-ui/core';

import { withRouter } from 'react-router-dom';

class Nav extends Component {
  state = {
    anchorEl: null,
  }

  handleClick = (e) => {
    this.setState({ anchorEl: e.currentTarget });
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  }

  handleLogout = () => {
    this.handleClose();
    localStorage.removeItem('token');
    this.props.onLogout();
  }

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
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
                  aria-owns={open ? 'profile-menu' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleClick}
                  color="inherit"
                  >
                  <AccountCircle />
                  </IconButton>
                  <Menu
                  id="profile-menu"
                  anchorEl={anchorEl}
                  onClose={this.handleClose}
                  open={Boolean(anchorEl)}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleLogout}>Log Out</MenuItem>
                </Menu>
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

export default withRouter(withStyles(styles)(Nav));
