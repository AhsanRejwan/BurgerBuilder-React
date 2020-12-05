import React from "react";
import classes from "./Toolbar.css"
import {Logo} from "../../Logo/Logo";
import {NavigationItems} from "../NavigationItems/NavigationItems";

const toolbar = () => (
    <head className={classes.Toolbar}>
        <div>Menu</div>
        <Logo />
        <nav>
            <NavigationItems />
        </nav>
    </head>
);

export default toolbar;