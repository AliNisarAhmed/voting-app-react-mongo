import React, { Component } from 'react';
import Axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt from 'jsonwebtoken';

import Nav from './Nav';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';

export default class App extends Component {
  state = {
    data: [],
    err: null,
    isLoading: false,
    auth: false,
  }

  componentDidMount() {
    this.fetchData();
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwt.decode(token.split(' ')[1]);
      const now = Date.now().valueOf() / 1000;
      console.log(decoded, now, decoded.exp, 'now < decoded.exp', now < decoded.exp);
      if (decoded.exp > now) {
        this.setState({ auth: true });
      }
    }
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
    this.setState({ auth: true });
    localStorage.setItem('token', token);
  }

  onLogout = () => {
    this.setState({ auth: false });
  }
  
  render() {
    return (
      <div>
        <Router>
          <>
            <Nav auth={this.state.auth} onLogout={this.onLogout}/>
            <Switch>
              <Route path="/" exact render={() => (
                <LandingPage
                  isLoading={this.state.isLoading}
                  err={this.state.err}
                  data={this.state.data}
                />
              )} />
              <Route path="/login" exact={true} render={(props) => (
                <LoginPage {...props} handleLogin={this.handleLogin} />
              )} />
            </Switch>
          </>
        </Router>
      </div>
    )
  }
}
