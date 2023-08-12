// Navbar.js

import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Burger, BurgerMenu } from './Burger'
import { RecipeContext } from '../App'
import { FABContainer, FABInner, FABOuter } from './Builders'

export const Navbar = () => {

    const [open, setOpen] = useState(false)

    const [
        ,
        ,
        factorBtn,
        setFactorBtn,
    ] = useContext(RecipeContext)

    return (
        <header>

            <Burger open={open} setOpen={setOpen} />
            
            <BurgerMenu open={open} setOpen={setOpen}>
                <Link to='/'>HOME</Link>
                <Link to='/list'>Full list of recipes</Link>
                <Link to='/list-by-ingredient'>Index by ingredient</Link>
                <Link to='/search'>Search</Link>
                <br/><br/>
                
                <div>
                    Ability to multiply recipe amounts by a specified factor
                    <br/>is <code>{!!factorBtn ? ' ON' : ' OFF'}.</code>
                </div>

                <br/>&nbsp;<br/>&nbsp;
                <div>
                    Version: {process.env.REACT_APP_VERSION}
                </div>
            </BurgerMenu>

            <FactorFAB setFactorBtn={setFactorBtn} factorBtn={factorBtn} />
            
        </header>
    )
}

const FactorFAB = props => {

    const { setFactorBtn, factorBtn } = props

    return (
        <FABContainer>
            <FABOuter
                className='FABOuter'
                activated={factorBtn}
                onClick={(evt) => {
                    console.log(48, {factorBtn})
                    setFactorBtn(prev => !prev)
                }}
            >
                <FABInner
                    className='FABInner'
                >
                    <div>+</div>
                    <div>-</div>
                </FABInner>
            </FABOuter>
        </FABContainer>
    )
}
