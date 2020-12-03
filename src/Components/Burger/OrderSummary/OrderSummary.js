import React from "react";
import Auxiiliary from "../../../hoc/Auxiliary";

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map((igkey) => {
        return (
            <li key={igkey}>
                <span style={{textTransform: "capitalize"}}>{igkey}</span> :{" "}
                {props.ingredients[igkey]}
            </li>
        );
    });
    return (
        <Auxiiliary>
            <h3>Your Order:</h3>
            <p> Burger with</p>
            <ul>{ingredientSummary}</ul>
            <p>Continue to checkout????</p>
            <button onClick={props.cancel}>Cancel</button>
            <button onClick={props.continue}>Continue</button>
        </Auxiiliary>
    );
};

export default orderSummary;
