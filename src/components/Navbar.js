// Navbar.js

import React from 'react'
import { Link } from 'react-router-dom'
import { Burger, BurgerMenu } from './Burger'

export const Navbar = () => {

    return (
        <header>
            <Link to='/'>HOME</Link>
            &nbsp; | &nbsp;
            <Link to='/list'>List</Link>
            &nbsp; | &nbsp;
            <Link to='/list-by-ingredient'>By Ingredient</Link>
            &nbsp; | &nbsp;
            <Link to='/search'>Search</Link>

            <Burger />
            <BurgerMenu />
        </header>
    )
}
