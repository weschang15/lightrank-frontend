import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Admin, Home, UserJoin } from "Pages";
import { ProtectedRoute } from "Utilities";
import Header from "./Header/Header";
import Logout from "./Users/Logout";
import PropTypes from "prop-types";

class Routes extends Component {
  static propTypes = {
    isAuth: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
  };

  static defaultProps = {
    isAuth: false,
    isLoading: false
  };

  render() {
    const { isAuth, isLoading } = this.props;
    return (
      <>
        <Switch>
          <Route exact path="/" component={Home} />
          <ProtectedRoute
            path="/dashboard"
            component={Admin}
            isAuth={isAuth}
            isLoading={isLoading}
          />
          <Route path="/users/join" component={UserJoin} />
          <Route path="/users/logout" component={Logout} />
        </Switch>
      </>
    );
  }
}

export default Routes;
