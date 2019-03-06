import React, { Component } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
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
        this.props.history.push('/');
      } else {
        this.setState({ isError: true });
      }
    } catch (error) {
      this.setState({isError: true});
    }
  }

  render() {
    return (
      <Grid container alignContent="center" justify="center">
        <form autoComplete="on">
          <TextField
            error={this.state.isError}
            id="email"
            label="Email" 
            type="text" 
            margin="normal"
            placeholder="Enter your email" 
            autoFocus={true}
            onChange={this.handleInput('email')}
            value={this.state.email}
            variant="outlined"
            fullWidth={true}
            required={true}
          />
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
          <Button type="submit" color="primary" onClick={this.onFormSubmit}>Submit</Button>
        </form>  
      </Grid>
    );
  }
}
