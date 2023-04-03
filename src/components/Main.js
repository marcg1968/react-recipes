// Main.js

import React from 'react'
import logo from '../apron.svg'
import { MainHeader } from './Builders'

export const Main = () => {
    return (
        <div>
            <MainHeader>Recipe Collection</MainHeader>
            <img src={logo} className="apron-logo" alt="apron" />
        </div>
    )
}
