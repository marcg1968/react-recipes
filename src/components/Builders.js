// Builders.js

import styled, { createGlobalStyle, keyframes } from 'styled-components'

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

    /* TODO: make these styled comps */
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
    @media screen {
        .print-only {
            display: none;
        }
    }
    @media print {
        header, aside {
            display: none;
        }
        body {
            height: auto;
            width: auto;
            text-align: center;
            overflow-x: auto;
        }
        footer.print-only {
            display: block;
            font-size: .9rem;
            // color: #1c4286;
            color: #333;
            margin-top: 1rem;
        }
        main {
            // width: 100% !important;
            // padding: 0 !important;
            // margin: 0 !important;
            margin: .9rem !important;
            padding: .9rem !important;
            border: 1px solid grey;
            background-color: transparent;
            min-height: auto;
            display: block;
            align-items: left;
            font-size: 1.33rem;
            color: black;
        }
        h1 {
            border-bottom: 1px solid grey;
            padding: .3rem;
            margin: .3rem;
            // background-color: #abc;
        }
        div.ingred-col,
        div.ingred-col-1,
        div.ingred-col-2,
        div.ingred-col-3 {
            flex: 1;
            // border: 1px solid red;
            margin: .1rem;
            padding: .1rem;
        }
        .print-text-right {
            text-align: right;
        }
        .print-text-left {
            text-align: left;
        }
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
    @media print {
        // border: 10px solid green;
        margin: 1rem 0 2rem 0;
    }
    @media screen {
        display: flex;
        flex-direction: column;
        text-align: left;
        justify-content: center;
        margin-bottom: 2rem;
    }
`

export const IngredientRow = styled.div`
    @media print {
        // border: 5px solid magenta;
        display: flex;
    }
    @media screen {
        display: flex;
        flex-direction: row;
        justify-content: center;
        border: 1px solid salmon;
        width: 680px;
        margin: auto; /* centers it horizontally */
        padding-bottom: .5rem;
        padding-top: .5rem;
    }
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

export const FactorSection = styled.section`
    display: flex;
    flex-direction: row;
    margin: 1rem 6rem;
`

export const FactorText = styled.span`
    font-size: 0.9rem;
    flex: 3;
    padding: .67rem .67rem 0 0;
    text-align: right;
`
    
export const FactorInput = styled.input.attrs(props => ({
    maxlength: props.maxlength || 9,
    size: props.size || 9,
}))`
    flex: 1;
    font-size: 1.3rem;
    padding-left: .2rem;
    text-align: center;
`

export const FactorButton = styled.button`
    flex: 1;
    font-size: 1rem;
    background: ivory;
    margin: .3rem 0 .3rem 1rem;
    padding: .2rem;
    border-radius: 3px;
    border: 2px solid salmon;
`

export const FABContainer = styled.div`
    position: relative;
`

export const FABOuter = styled.div`
    position: fixed;
    bottom: 3rem;
    right: 3rem;
    border: 3px solid ivory;
    // background: salmon;
    background: ${props => props.activated ? 'salmon' : 'grey'};
    border-radius: 50%;
    width: 6rem;
    height: 6rem;
    margin-left: auto;
    margin-right: auto;
    padding -1rem -1rem;
    display: flex;
    flex-direction: row;
    color: ivory;
    font-size: 6rem;
    line-height: 3rem;
    font-weight: 900;
    box-shadow: 0 10px 25px rgba(100, 149, 237, 0.6);
`

export const FABInner = styled.div`
    display: flex;
    // flex: 1;
    flex-direction: column;
    justify-content: center; /* center-align children vertically*/
    text-align: center; /* horizontal center alignment */
    width: 100%; /* nec for text-alignment */
    height: 100%; /* nec for text-alignment */
`

export const spinAnimation = keyframes`
    0%      { transform: rotate(0deg); }
    100%    { transform: rotate(360deg); }
`

export const Spinner = styled.div`
    border: 10px solid transparent;
    border-top: 10px solid salmon;
    border-radius: 50%;
    width: ${props => props.width || 80}px;
    height: ${props => props.height || 80}px;
    // animation: spin 1s linear infinite;
    animation-name: ${spinAnimation};
    animation-duration: 1s;
    animation-iteration-count: infinite;
`

export const ContainerSpinnerCentered = styled.div.attrs(props => ({
    // width: props.width && !isNaN(parseInt(props.width)) ? 40,
    width:  props.width  && typeof parseInt(props.width)  === 'number' ? props.width  / 2 : 40,
    height: props.height && typeof parseInt(props.height) === 'number' ? props.height / 2 : 40,
}))`
    position: fixed;
    top:  calc(50% - ${props => props.height || 80}px);
    left: calc(50% - ${props => props.width || 80}px);
`