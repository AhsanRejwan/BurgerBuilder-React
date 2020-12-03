import React from "react";
import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";
const controls = [
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat ", type: "meat" },
  { label: "Salad", type: "salad" },
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>
      Current price = <strong>{props.currentPrice.toFixed(2)}</strong>
    </p>
    {controls.map((el) => (
      <BuildControl
        key={el.label}
        label={el.label}
        added={() => props.addIngredients(el.type)}
        removed={() => props.removeIngredients(el.type)}
        disabled={props.disabled[el.type]}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.ordering}
    >
      Checkout
    </button>
  </div>
);

export default buildControls;
