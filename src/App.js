import React, { Component } from 'react';
import Layout from './Components/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import { Checkout } from './Containers/Checkout/Checkout';
import { Route, Switch } from 'react-router';
import Orders from './Containers/Orders/Orders';
import { Auth } from './Containers/Auth/Auth';

class App extends Component {
  state = {
    token: null,
  };

  setToken = (token) => {
    console.log('Setting token in app.js' + token);
    this.setState({ token: token });
  };

  render() {
    return (
      <Layout>
        <Switch>
          <Route path={'/checkout'} component={Checkout} />
          <Route
            path={'/orders'}
            render={() => <Orders token={this.state.token} />}
          />
          <Route
            path={'/auth'}
            render={() => <Auth setToken={this.setToken} />}
          />
          <Route
            path={'/'}
            render={(props) => (
              <BurgerBuilder {...props} token={this.state.token} />
            )}
            exact={true}
          />
        </Switch>
      </Layout>
    );
  }
}

export default App;
