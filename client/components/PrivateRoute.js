import { Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    this.props.auth === true
      ? <Component {...props} />
      : <Redirect to="login" />
  )} />
);

export default PrivateRoute;