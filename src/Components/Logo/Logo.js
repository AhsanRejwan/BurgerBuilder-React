import React from "react";

import logo from "../../Assets/Burger.png"
import classes from './Logo.css'

export const Logo = () => (
    <div className={classes.Logo}>
        <img src={logo} alt="my burger"/>
    </div>
);