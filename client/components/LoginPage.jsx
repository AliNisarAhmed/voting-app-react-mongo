import React, { Component } from 'react';
import { Grid, TextField, Button, FormControl } from '@material-ui/core';
import Axios from 'axios';

export default class LoginPage extends Component {
  state = {
    email: "",
    password: "",
    isError: false,
  }

  handleInput = name => e => {
    this.setState({
      [name]: e.target.value
    })
  }

  onFormSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    try {
      const response = await Axios({
        method: 'post',
        url: '/api/auth/login',
        data: {
          email, password
        }
      });
      if (response.status === 200) {
        this.setState({ isError: false, email: "", password: "" });
        console.log(this.props);
        console.log(response.data);
        this.props.handleLogin(response.data.token);
        this.props.history.goBack();
      } else {
        this.setState({ isError: true });
      }
    } catch (error) {
      this.setState({isError: true});
    }
  }

  render() {
    console.log("Login Page Props: ", this.props);
    console.log(this.props.history);
    return (
      <Grid container alignContent="center" justify="center">
        <form autoComplete="on">
          <FormControl fullWidth>
            <TextField
              error={this.state.isError}
              id="email"
              label="Email" 
              type="email" 
              margin="normal"
              autoFocus={true}
              onChange={this.handleInput('email')}
              value={this.state.email}
              variant="outlined"
              fullWidth={true}
              required={true}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              error={this.state.isError}
              id="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
              margin="normal"
              onChange={this.handleInput('password')}
              value={this.state.password}
              variant="outlined"
              fullWidth={true}
              required={true}
            />
          </FormControl>
          <Button 
            type="submit" 
            color="primary" 
            variant="contained" 
            fullWidth 
            onClick={this.onFormSubmit}
          >
            Sign In
          </Button>
        </form>  
      </Grid>
    );
  }
}
