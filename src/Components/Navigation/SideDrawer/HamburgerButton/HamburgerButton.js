import React from "react";
import HamburgerIcon from "../../../../Assets/menuicon.jpg"
import classes from "./HamburgerButton.css"
export const HamburgerButton = (props) => (
    <div className={classes.HamburgerButton} onClick={props.clicked}>
        <img src={HamburgerIcon} alt={"MenuButton"} />
    </div>
);