import React, { Component } from 'react';
import { CheckoutSummary } from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router';
import ContactData from './ContactData/ContactData';

export class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0,
    token: null,
  };
  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    let token = null;
    for (let param of query.entries()) {
      if (param[0] === 'token') {
        token = param[1];
      } else if (param[0] === 'price') {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({
      ingredients: ingredients,
      totalPrice: price,
      token: token,
    });
  }

  checkoutCanceled = () => {
    this.props.history.goBack();
  };

  checkoutContinued = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          onCheckoutCanceled={this.checkoutCanceled}
          onCheckoutContinued={this.checkoutContinued}
        />
        <Route
          path={this.props.match.path + '/contact-data'}
          render={(props) => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.totalPrice}
              token={this.state.token}
              {...props}
            />
          )}
        ></Route>
      </div>
    );
  }
}
