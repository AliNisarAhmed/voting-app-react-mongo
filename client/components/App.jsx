import React, { Component } from 'react';
import Axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Nav from './Nav';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import SnackBarComponent from './SnackBarComponent';
import { Divider, Button } from '@material-ui/core';
import NewPoll from './NewPoll';

import checkTokenExpiry from './helperFunctions/checkTokenExpiry';
import PrivateRoute from './PrivateRoute';

class App extends Component {
  state = {
    data: [],
    err: null,
    isLoading: false,
    auth: false,
    snackbarOpen: false,
    snackbarMessage: ""
  }

  componentDidMount() {
    this.fetchData();
    const token = localStorage.getItem('token');
    if (token && checkTokenExpiry(token)) {
      this.setState({ auth: true });
    }
  }

  componentDidUpdate() {
    
  }

  fetchData = async () => {
    this.setState({isLoading: true})
    let res = await Axios.get('/api/polls');
    console.log(res);
    if (res.status === 200) {
      this.setState({data: res.data, isLoading: false});
    } else {
      this.setState({err: "Error", isLoading: false});
    }
  }

  handleLogin = (token) => {
    this.setState({ auth: true, snackbarOpen: true, snackbarMessage: "Successfully Logged In!" });
    localStorage.setItem('token', token);
  }

  onLogout = () => {
    this.setState({ auth: false, snackbarOpen: true, snackbarMessage: "Successfully Logged Out" });
  }

  handleSnackbarClose = () => {
    this.setState({
      snackbarOpen: false,
      snackbarMessage: "",
    })
  }

  onRegister = () => {
    this.setState({
      snackbarOpen: true,
      snackbarMessage: "Successfully Registered, please Login"
    });
  }

  // onNewPollClick = () => {
  //   if (this.state.auth) {
  //     console.log(this.props);
  //     // this.props.history.push('/new');
  //   } else {
  //     this.props.history.push('/login');
  //   }
  // }
  
  render() {
    return (
      <div>
        <Router>
          <>
            <Nav auth={this.state.auth} onLogout={this.onLogout}/>
            <Button 
              variant="contained" 
              color="primary"
              size="large"
              to="/login"
              component={Link}
            >
              New Poll
            </Button>
            <SnackBarComponent 
              open={this.state.snackbarOpen} 
              message={this.state.snackbarMessage}
              handleClose={this.handleSnackbarClose}
            />
            <Divider light/>
            <Switch>
              <Route 
                path="/" 
                exact
                push 
                render={() => (
                  <LandingPage
                    isLoading={this.state.isLoading}
                    err={this.state.err}
                    data={this.state.data}
                  />
                )} 
              />
              <Route 
                path="/login" 
                exact={true}
                push 
                render={(props) => (
                  <LoginPage {...props} handleLogin={this.handleLogin} />
                )} 
              />
              <Route
                path="/register"
                exact={true}
                render={props => (
                  <RegisterPage {...props} onRegister={this.onRegister}/>
                )}
              />
              <PrivateRoute path='/new' component={NewPoll} auth={this.state.auth}/>
            </Switch>
          </>
        </Router>
      </div>
    )
  }
}

export default App;
