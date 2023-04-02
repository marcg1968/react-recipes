// Main.js

import React from 'react'
import logo from '../apron.svg'

export const Main = () => {
    return (
        <div>
            <h1>Recipe Collection</h1>
            <img src={logo} className="apron-logo" alt="apron" />
        </div>
    )
}
