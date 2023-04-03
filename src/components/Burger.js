// Burger.js

/*
Based on https://css-tricks.com/hamburger-menu-with-a-side-of-react-hooks-and-styled-components/
*/

import React from 'react'
import { StyledBurger, StyledMenu } from './Builders'

export const Burger = ({ open }) => {
    return (
        <StyledBurger
            open={open}
        >
            <div />
            <div />
            <div />
        </StyledBurger>
    )
}

export const BurgerMenu = ({open, children}) => {

    // open = true
    return (
        <StyledMenu open={open}>
            {children}
        </StyledMenu>
    )

    // return null
}
