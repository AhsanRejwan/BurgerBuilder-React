import React, { Component } from 'react';
import Layout from './Components/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import { Checkout } from './Containers/Checkout/Checkout';
import { Route, Switch } from 'react-router';
import Orders from './Containers/Orders/Orders';

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path={'/checkout'} component={Checkout} />
          <Route path={'/orders'} component={Orders} />
          <Route path={'/'} component={BurgerBuilder} exact={true} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
