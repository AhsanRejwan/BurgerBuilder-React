import React from 'react';
import classes from './Toolbar.css';
import { Logo } from '../../Logo/Logo';
import { NavigationItems } from '../NavigationItems/NavigationItems';
import { HamburgerButton } from '../SideDrawer/HamburgerButton/HamburgerButton';

const toolbar = (props) => (
  <div className={classes.Toolbar}>
    <HamburgerButton clicked={props.clicked} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </div>
);

export default toolbar;
