// Recipe.js

import React, { useCallback, useEffect, useState, useContext } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
// import { sleep } from '../common/functions'
import {
    Header3,
    IngredientRow,
    IngredientContainer,
    MethodContainer,
} from './Builders'
import { RecipeListContext } from '../App'
import { dbGetRecipe } from '../common/functions'

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
    const noprevnext = state?.noprevnext

    /* if a prev or next <Link/> has been clicked, update the recipeId state var */
    useEffect(() => {
        if (linkedid) setRecipeId(linkedid)
    }, [linkedid])

    const getRecipe = useCallback(async () => {
        if (!recipeId) return
        // await sleep(3000)
        const result = await dbGetRecipe(recipeId)
        setRecipe(result instanceof Array ? result[0] : result)
        setLoaded(true)
    }, [recipeId])

    useEffect(() => {
        getRecipe()
    }, [getRecipe]) /* NB dependency must be the const function */

    const {
        title,
        meta,
        parts,
    } = recipe || {}
    
    if (parts && parts instanceof Array) parts[0].title = null // remove "__MAIN__"
    const metadata = meta instanceof Array 
        ? meta.reduce((acc, curr) => {
            acc[curr[0]] = curr[1]
            return acc
        }, {}) 
        : {}
    const { lang } = metadata || {}

    const PrevOrNextLink = ({ type = 'next' }) => {

        if (    !recipeTitles
            ||  !Array.isArray(recipeTitles)
            ||  !recipeTitles.length
            ||  !id
            ||  noprevnext
        ) return null

        // find position in list
        const idx = recipeTitles.findIndex(e => e._id === id)
        const nextRecipe = (idx + 1 < recipeTitles.length) ? recipeTitles[(idx + 1)] : null
        const prevRecipe = (idx > 0) ? recipeTitles[(idx - 1)] : null
        if (type === 'next' && !nextRecipe) return null
        if (type === 'prev' && !prevRecipe) return null

        return type === 'prev'
            ? ( <Link
                    title={prevRecipe.title}
                    className='prevnextlink'
                    to={`/recipe/${prevRecipe._id}`}
                    state={{ linkedid: prevRecipe._id }}
                    onClick={() => setLoaded(false)}
                >&lt;&lt;&nbsp;&nbsp;</Link>
            )
            : ( <Link
                    title={nextRecipe.title}
                    className='prevnextlink'
                    to={`/recipe/${nextRecipe._id}`}
                    state={{ linkedid: nextRecipe._id }}
                    onClick={() => setLoaded(false)}
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
