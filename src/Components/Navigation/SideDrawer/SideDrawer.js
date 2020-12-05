import React from "react";
import {Logo} from "../../Logo/Logo";
import {NavigationItems} from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.css"
import BackDrop from "../../UI/Backdrop/Backdrop"
import Auxiliary from "../../../hoc/Auxiliary"

export const SideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.close];
    if (props.open)
    {
        attachedClasses = [classes.SideDrawer, classes.open]
    }
    return(
        <Auxiliary>
            <BackDrop show = {props.open} clicked = {props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>

            </div>
        </Auxiliary>
    )
};