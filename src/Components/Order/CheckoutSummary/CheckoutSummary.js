import React from 'react';
import Burger from '../../Burger/Burger';
import classes from './CheckoutSummary.css';

export const CheckoutSummary = (props) => (
  <div className={classes.CheckoutSummary}>
    <h1>Hope its good</h1>
    <div>
      <Burger ingredients={props.ingredients} />
    </div>
    <button onClick={props.onCheckoutCanceled}>Cancel</button>
    <button onClick={props.onCheckoutContinued}>Continue</button>
  </div>
);
