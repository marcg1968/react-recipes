// Builders.js

import styled from 'styled-components'

export const LoadingWrapper = styled.div`
    //align-items: flex-end;
    //justify-content: center;

    position: fixed;
    top: ${props => 'top' in props ? props.top : 0};
    left: 0px;
    height: ${props => 'height' in props ? props.height : 0};
    opacity: ${props => 'opacity' in props ? props.opacity : 0};
    width: 100vw;
    background-color: rgba(58, 14, 23, 0.75);
    display: flex;
    //transition: height 500ms ease 1500ms, opacity 2500ms ease 0s;
    //transition: height 500ms ease 1500ms, opacity 2500ms ease 0s;
    transition: opacity 2500ms ease 0s;
`

export const LoadingWrapper2 = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: center;
`

export const Dot = styled.div`
    background-color: black;
    border-radius: 50%;
    width: 0.75rem;
    height: 0.75rem;
    margin: 0 0.25rem;
`

export const Searchfield = styled.input`
    border-radius: 3px;
    border: 3px solid salmon;
    margin: 1rem;
    padding: 1rem;
    display: block;
    // min-width: 50vw;
    width: 500px;
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
    width: 350px;
    /* width: calc((1000px / 3) - .6rem); */
    border: 1px solid rgb(250, 128, 114);
    border-color: rgba(250, 128, 114, 0.4);
`
