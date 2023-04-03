// Navbar.js

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { StyledBurger } from './Builders'
import { Burger, BurgerMenu } from './Burger'

export const Navbar = () => {

    const [open, setOpen] = useState(false)

    return (
        <header>

            <Burger open={open} setOpen={setOpen} />
            
            <BurgerMenu open={open} setOpen={setOpen}>
                <Link to='/'>HOME</Link>
                <Link to='/list'>Full list of recipes</Link>
                <Link to='/list-by-ingredient'>Index by ingredient</Link>
                <Link to='/search'>Search</Link>
            </BurgerMenu>
            
        </header>
    )
}
