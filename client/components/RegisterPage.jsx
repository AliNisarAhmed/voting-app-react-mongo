import React, { Component } from 'react'
import { Grid, FormControl, TextField, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

class RegisterPage extends Component {
  state = {
    isError: false,
    username: "",
    email: "",
    password: "",
    password2: "",
  }

  handleInput = name => e => {
    this.setState({
      [name]: e.target.value
    })
  }

  handleFormSubmit = async (e) => {
    e.preventDefault();
    this.setState({ isError: false })
    const { username, email, password, password2 } = this.state;
    if (password.length !== password2.length || password.length <=3) {
      this.setState({ isError: true });
    }
    try {
      const response = await Axios({
        method: 'post',
        url: '/api/auth/register',
        data: {
          username, email, password, password2
        }
      });
      if (response.status === 200) {
        this.setState({ isError: false, username: "", email: "", password: "", password2: "" });
        // modify something in the app component here to notify user of successful registration, to be implemented later
        this.props.history.push('/login');
      } else {
        this.setState({ isError: true });
      }
    } catch (error) {
      console.log(error);
    }

  }

  render() {
    return (
      <Grid 
        container={true}
        alignItems="center" 
        justify="center" 
        sm={10} 
        md={8}
      >
        <form onSubmit={this.handleFormSubmit}>
          <FormControl fullWidth>
            <TextField 
              type="text"
              error={this.state.isError}
              id="username"
              label="Username"
              required
              autoFocus
              onChange={this.handleInput('username')}
              value={this.state.username}
              variant="outlined"
              margin="normal"
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField 
              type="email"
              error={this.state.isError}
              id="email"
              label="Email"
              required
              autoFocus
              onChange={this.handleInput('email')}
              value={this.state.email}
              variant="outlined"
              margin="normal"
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField 
              type="password"
              error={this.state.isError}
              id="password"
              label="Password"
              required
              autoFocus
              onChange={this.handleInput('password')}
              value={this.state.password}
              variant="outlined"
              margin="normal"
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField 
              type="password"
              error={this.state.isError}
              id="password2"
              label="Repeat Password"
              required
              autoFocus
              onChange={this.handleInput('password2')}
              value={this.state.password2}
              variant="outlined"
              margin="normal"
            />
          </FormControl>
          <Button
            type="submit"
            color="primary"
            fullWidth
            variant="contained"
          >
            Register
          </Button>
        </form>
      </Grid>
    )
  }
}

export default withRouter(RegisterPage);
