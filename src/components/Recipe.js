// Recipe.js

import React, { useCallback, useEffect, useState, useContext } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import axios from 'axios'
import { ApiEndpoint } from '../common/constants'
// import { sleep } from '../common/functions'
import {
    // Header2,
    Header3,
    // Header4,
    IngredientRow,
    IngredientContainer,
    MethodContainer,
} from './Builders'
import { RecipeListContext } from '../App'

const { urlRecipe } = ApiEndpoint

export const Recipe = props => {

    const params = useParams()
    const { id } = params || {}

    const [ loaded,   setLoaded   ]   = useState(false)
    const [ recipe,   setRecipe   ]   = useState({})
    const [ recipeId, setRecipeId ]   = useState(id)

    const [
        recipeTitles,
        // setRecipeTitles
    ] = useContext(RecipeListContext)

    const { state } = useLocation()
    const linkedid = state?.linkedid
    // console.log(35, {linkedid})

    useEffect(() => {
        console.log(39, {linkedid})
        if (linkedid) setRecipeId(linkedid)
    }, [linkedid])

    useEffect(() => {
        console.log(44, 'params', params)
    }, [params])

    const getRecipe = useCallback(async () => {
        if (!recipeId) return
        // await sleep(3000)
        try {
            const data = await axios.get(`${urlRecipe}/${recipeId}`).then(({data}) => data)
            console.log(18, data)
            const { result } = data
            setRecipe(result instanceof Array ? result[0] : result)
            setLoaded(true)
        }
        catch (err) { console.error(19, { err }) }
    }, [recipeId])

    useEffect(() => {
        getRecipe()
    }, [getRecipe]) /* NB dependency must be the const function */

    const {
        title,
        meta,
        parts,
    } = recipe || {}
    
    // parts[0].title = null // remove "__MAIN__"
    if (parts && parts instanceof Array) parts[0].title = null // remove "__MAIN__"
    // const metadata = meta instanceof Array ? meta.reduce((acc, curr) => (acc[curr[0]] = curr[1], acc), {}) : {}
    const metadata = meta instanceof Array 
        ? meta.reduce((acc, curr) => {
            acc[curr[0]] = curr[1]
            return acc
        }, {}) 
        : {}
    const { lang } = metadata || {}

    const PrevOrNextLink = ({ type = 'next' }) => {

        if (    !recipeTitles
            // ||  !recipeTitles instanceof Array
            ||  !Array.isArray(recipeTitles)
            ||  !recipeTitles.length
            ||  !id
        ) return null

        // console.log(76, typeof recipeTitles)
        // console.log(77, recipeTitles instanceof Array)
        // console.log(78, recipeTitles)
        // return null
    
        // find position in list
        const idx = recipeTitles.findIndex(e => e._id === id)
        const nextRecipe = (idx + 1 < recipeTitles.length) ? recipeTitles[(idx + 1)] : null
        const prevRecipe = (idx > 0) ? recipeTitles[(idx - 1)] : null
        // console.log(84, {id, idx, nextRecipe, _next: recipeTitles[idx + 1], _len: recipeTitles.length})
        if (type === 'next' && !nextRecipe) return null
        if (type === 'prev' && !prevRecipe) return null
        // // title={`Next recipe: ${nextRecipe.title}`} 
        // console.log(70, {idx, nextRecipe})

        return type === 'prev'
            ? ( <Link
                    title={prevRecipe.title}
                    className='prevnextlink'
                    to={`/recipe/${prevRecipe._id}`}
                    state={{ linkedid: prevRecipe._id }}
                >&lt;&lt;&nbsp;&nbsp;</Link>
            )
            : ( <Link
                    title={nextRecipe.title}
                    className='prevnextlink'
                    to={`/recipe/${nextRecipe._id}`}
                    state={{ linkedid: nextRecipe._id }}
                >&nbsp;&nbsp;&gt;&gt;</Link>
            )
    }    

    return (
        <div>
            {
                loaded && parts instanceof Array
                    ? (
                        <>
                            <h1>
                                <PrevOrNextLink type='prev' />
                                {title}&nbsp;{lang && lang === 'de' ? '(in German)' : ''}
                                <PrevOrNextLink type='next' />
                            </h1>
                            {
                                parts.map((e, i) => <Part key={`part-${i}`} { ...parts[i] } n={i} />) 
                            }
                            {/* <pre>{JSON.stringify(recipeTitles, null, 2)}</pre> */}
                        </>
                    )
                    : <p>loading ...</p>
            }
        </div>
    )
}

const Part = ({ title = null, ingreds = null, method = null, n = 0 }) => {

    return (
        <>
            {
                ingreds
                    ? (
                        <IngredientContainer>
                            {   title && <Header3>{title}</Header3> }
                            {
                                // ingreds.map(({ name='', qty={} }, i) => (
                                ingreds.map(({ name='', qty: { amt='', unit='' } }, i) => {
                                    unit = unit === 'x' ? '' : `${unit}\u00A0`
                                    return (
                                        <IngredientRow
                                            key={`ingred-${n}-${i}`}
                                        >
                                            <div className='ingred-col-1 text-right'>{amt}&nbsp;{unit}</div>
                                            <div className='ingred-col-3'>{name}</div>
                                        </IngredientRow>
                                    )
                                })
                            }
                        </IngredientContainer>
                    )
                    : null
            }
            {
                method
                    ? (
                        <MethodContainer>
                        {
                            method.map((e, i) => (
                                <li key={`meth-${n}-${i}`}>{e}</li>
                            ))
                        }
                        </MethodContainer>
                    )
                    : null
            }
        </>
    )
}

/*
const Ingredients = props => {
    return (
        <>
        </>
    )
}
*/