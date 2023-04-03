// Burger.js

/*
Based on https://css-tricks.com/hamburger-menu-with-a-side-of-react-hooks-and-styled-components/
*/

import React from 'react'
import { StyledBurger, StyledMenu } from './Builders'

export const Burger = ({ open, setOpen }) => {

    return (
        <StyledBurger
            open={open}
            onClick={() => setOpen(!open)}
        >
            <div />
            <div />
            <div />
        </StyledBurger>
    )
}

export const BurgerMenu = ({ open, children, setOpen }) => {

    // open = true
    return (
        <StyledMenu
            open={open}
            onClick={() => setOpen(!open)}
        >
            {children}
        </StyledMenu>
    )

    // return null
}
