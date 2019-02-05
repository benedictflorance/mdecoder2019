import React from 'react';
import { Route, Redirect } from 'react-router';

export default class AuthRoute extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { isAuthenticated, component: Component, ...rest } = this.props;
    console.log(isAuthenticated);
    console.log(this.props)
    const renderingElement = props =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/userlogin',
            state: { from: props.location }
          }}
        />
      );
    return <Route {...rest} render={renderingElement} />;
  }
}
