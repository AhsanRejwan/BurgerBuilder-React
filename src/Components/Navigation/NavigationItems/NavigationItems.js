import React from 'react';
import classes from './NavigationItems.css';
import { NavigationItem } from './NavigationItem/NavigationItem';

export const NavigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/">Burger Builder</NavigationItem>
    <NavigationItem link="/orders">My Orders</NavigationItem>
    <NavigationItem link="/auth">Log In</NavigationItem>
  </ul>
);
