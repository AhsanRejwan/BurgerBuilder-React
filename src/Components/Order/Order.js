import React from 'react';
import classes from './Order.css';

export const Order = (props) => {
  const ingredients = [];
  for (let name in props.ingredients) {
    ingredients.push({ name: name, amount: props.ingredients[name] });
  }

  const ingredientoutput = ingredients.map((ig) => (
    <span
      key={ig.name}
      style={{
        textTransform: 'capitalize',
        display: 'inline-block',
        margin: '0 8px',
        border: '1px solid #ccc',
        padding: '5px',
      }}
    >
      {ig.name} : {ig.amount}
    </span>
  ));
  return (
    <div className={classes.Order}>
      <p> Ingredients: {ingredientoutput}</p>
      <p> Price: {Number.parseFloat(props.price).toFixed(2)} </p>
    </div>
  );
};
