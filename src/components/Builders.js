// Builders.js

import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
    html, body {
        margin: 0;
        padding: 0;
    }
    *, *::after, *::before {
        box-sizing: border-box;
    }
    body {
        height: 100vh;
        width: 100vw;
        text-align: center;
        overflow-x: hidden; /* to enable shifting of menu out of view */
    }
    main {
        background-color: #282c34;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        // font-size: calc(10px + 2vmin);
        font-size: 1.33rem;
        color: white;
    }
    .header {
        background-color: #282c34;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: calc(10px + 2vmin);
        color: white;
    }
    
    .App-link {
        color: #61dafb;
    }
    
    pre {
        text-align: left;
        font-size: .85rem;
    }
    
    ul {
        text-align: left;
        font-size: 1rem;
    }
    
    li {
        text-align: left;
    }

    ol > li {
        padding: 0 1rem 1.1rem 1rem;
    }
    
    .link,
    li > a,
    li > a:visited {
        color: aliceblue;
        color: cornflowerblue;
    }
    .prevnextlink {
        text-decoration: none;
        color: cornflowerblue;
    }
    div.ingred-col {
        flex: 1;
    }
    div.ingred-col-1 {
        flex: 1;
    }
    div.ingred-col-2 {
        flex: 2;
    }
    div.ingred-col-3 {
        flex: 3;
    }
    .text-right {
        text-align: right;
    }    
`

export const SearchContainer = styled.div`
    position: relative;
    display: block;
`

export const SearchForm = styled.form`
    display: flex;
`

export const Searchfield = styled.input`
    border-radius: 3px;
    border: 3px solid salmon;
    margin: 1rem;
    padding: .5rem 3rem .5rem .5rem;
    display: block;
    font-size: 1.5rem;
    color: #282c34;
    flex: 1;
`

export const MagnifyingGlass = styled.div`
    display: block;
    position: absolute;
    right: 1rem;
    top: 1.7rem;
    width: 3rem;
`

export const SearchSection = styled.section`
    display: flex;
    width: 800px;
    flex-direction: column;
    border: 1px solid salmon;
    border-radius: 3px;
    min-height: 90vh;
`

export const SearchDiv = styled.div`
    // flex: 1;
`

export const MainHeader = styled.h1`
    // margin-block-end: 1.33em;
    margin-block-end: 1em;
`

export const Header2 = styled.h2`
    text-align: center;
`

export const Header3 = styled.h3`
    text-align: center;
`

export const Header4 = styled.h4.attrs(props => ({
    align: props.align || 'center'
}))`
    text-align: ${props => props.align};
    margin-block-end: .3em;
    // margin-block-start: 1em;
`

export const IngredientContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    justify-content: center;
    margin-bottom: 2rem;
`

export const IngredientRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    border: 1px solid salmon;
    width: 680px;
    margin: auto; /* centers it horizontally */
    padding-bottom: .5rem;
    padding-top: .5rem;
`

export const MethodContainer = styled.ol`
    width: 860px;
    margin: auto auto 2rem auto; /* auto centers it horizontally */
    // margin: auto; /* auto centers it horizontally */
`

export const RecipeUL = styled.ul`
    text-align: left;
    font-size: 1rem;
    display: flex;
    width: 800px;
    flex-wrap: wrap;
    /* list-style-type: square; */
    list-style-type: none;
    border: 0px solid salmon;
`

export const RecipeLI = styled.li`
    margin: .3rem;
    /* padding: .3rem; */
    padding: .6rem;
    text-align: left;
    width: 360px;
    /* width: calc((1000px / 3) - .6rem); */
    border: 1px solid rgb(250, 128, 114);
    border-color: rgba(250, 128, 114, 0.4);
`

/* cf https://css-tricks.com/hamburger-menu-with-a-side-of-react-hooks-and-styled-components/ */
export const StyledMenu = styled.nav`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: ivory;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(150%)'};
    top: 4rem;
    height: calc(100vh - 4rem);
    text-align: left;
    padding: 0;
    position: absolute;
    right: 0.7rem;
    transition: transform 0.3s ease-in-out;
    padding: 1rem;

    li {
        padding-right: 0;
        padding-left: 3px;
        text-align: left;
    }

    a {
        font-size: 2rem;
        padding: 1rem .2rem;
        font-weight: bold;
        color: #282c34;
        text-decoration: none;
        transition: color 0.3s linear;

        @media (max-width: 576px) {
              font-size: 1.5rem;
              text-align: center;
        }
    
        &:hover {
            color: #343078;
            text-decoration: underline;
        }
    }
`

export const StyledBurger = styled.button`
    position: absolute;
    top: 30px;
    top: 1rem;
    right: 0.7rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 2.4rem;
    height: 3rem;
    border: none;
    cursor: pointer;
    padding: 6px 3px;
    // z-index: 10;

    &:focus {
        outline: none;
    }

    div { // div inside the burger
        width: 2.05rem;
        height: 0.375rem;
        background: #282c34;
        border-radius: 0;
        transition: all 0.3s linear;
        position: relative;
        transform-origin: 1px;
        color: ivory;

        :first-child {
            // transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
            transform: ${({ open }) => open ? 'rotate(40deg) translateX(1px)' : 'rotate(0)'};
            width: ${({ open }) => open ? '2.25rem' : '2.05rem'};
        }
    
        :nth-child(2) {
            opacity: ${({ open }) => open ? '0' : '1'};
            transform: ${({ open }) => open ? 'translateX(20px)' : 'translateX(0)'};
        }
    
        :nth-child(3) {
            // transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
            transform: ${({ open }) => open ? 'rotate(-40deg) translateX(1px)' : 'rotate(0)'};
            width: ${({ open }) => open ? '2.25rem' : '2.05rem'};
        }
    }
`
