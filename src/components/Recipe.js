// Recipe.js

import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
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

const { urlRecipe } = ApiEndpoint

export const Recipe = props => {

    const params = useParams()
    const { id } = params || {}

    const [loaded,   setLoaded]   = useState(false)
    const [recipe,   setRecipe]   = useState({})
    const [recipeId, setRecipeId] = useState(id)

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
    }, [])

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

    return (
        <div>
            {
                loaded && parts instanceof Array
                    ? (
                        <>
                            <h1>{title}</h1>
                            {
                                parts.map((e, i) => <Part key={`part-${i}`} { ...parts[i] } n={i} />) 
                            }
                            {/* <pre>{JSON.stringify(recipe, null, 2)}</pre> */}
                        </>
                    )
                    : <p>loading ...</p>
            }
            {/* Recipe {params.id} */}
            {/* <pre>{JSON.stringify(params, null, 2)}</pre> */}
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
                            method.map((e, i) => <li>{e}</li>)
                        }
                        </MethodContainer>
                    )
                    : null
            }
        </>
    )
}


const Ingredients = props => {

    return (
        <>
        </>
    )
}
