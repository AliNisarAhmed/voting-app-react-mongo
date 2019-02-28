import React, { Component } from 'react';
import Axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Nav from './Nav';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';

export default class App extends Component {
  state = {
    data: [],
    err: null,
    isLoading: false,
  }

  componentDidMount() {
    this.fetchData();
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
  
  render() {
    return (
      <div>
        <Router>
          <>
            <Nav />
            <Switch>
              <Route path="/" exact render={() => (
                <LandingPage
                  isLoading={this.state.isLoading}
                  err={this.state.err}
                  data={this.state.data}
                />
              )} />
              <Route path="/login" exact render={() => (
                <LoginPage />
              )} />
            </Switch>
          </>
        </Router>
      </div>
    )
  }
}
