// Navbar.js

import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {

    return (
        <header>
            <Link to='/'>HOME</Link>
            &nbsp; | &nbsp;
            <Link to='/list'>List</Link>
            &nbsp; | &nbsp;
            <Link to='/search'>Search</Link>
        </header>
    )
}
