// ListByIngredient.js

import React, { useCallback, useEffect, useState, useContext } from 'react'
// import { sleep } from '../common/functions'
import { RecipeContext } from '../App'
import { Header4 } from './Builders'
import { Link } from 'react-router-dom'
import { dbGetRecipes, dbGetRecipesByIngredient } from '../common/functions'

export const ListByIngredient = () => {

    const [ loaded,          setLoaded ]          = useState(false)
    const [ recipesByIngred, setRecipesByIngred ] = useState({})

    const [ recipeTitles, setRecipeTitles] = useContext(RecipeContext)

    const getRecipesByIngred = useCallback(async () => {
        // await sleep(3000)
        const result = await dbGetRecipesByIngredient()
        setRecipesByIngred(result)
        setLoaded(true)
    }, [])

    useEffect(() => {
        getRecipesByIngred()
    }, [getRecipesByIngred]) /* NB dependency must be the const function */

    const getRecipeTitles = useCallback(async () => { /* TODO: handle duplication, i.e. also present in List.js  */
        // await sleep(3000)
        const data = await dbGetRecipes()
        setRecipeTitles(data || [])
    }, [setRecipeTitles])

    useEffect(() => {
        getRecipeTitles()
    }, [getRecipeTitles]) /* NB dependency must be the const function */

    return (
        <div>
            {
                loaded === false
                    ? <p>loading ...</p>
                    : (
                        <>
                            <h1>Recipes by ingredient</h1>
                            {
                                Object.keys(recipeTitles).length && recipesByIngred && Array.isArray(recipesByIngred)
                                    ? recipesByIngred.map((e, i) => (
                                        <div key={`byingred-${i}`}>
                                            <Header4 align={'left'}>
                                                {e[0]}
                                            </Header4>
                                            <ul>
                                            {
                                                e[1].map((r, n) => {
                                                    const found = recipeTitles.find(f => f._id === r)
                                                    const { title } = found || {}
                                                    return (
                                                        <li key={`rec-${i}-${n}`}>
                                                            <Link to={`/recipe/${r}`} state={{ noprevnext: true }}>{title}</Link>
                                                        </li>
                                                    )
                                                })
                                            }
                                            </ul>
                                        </div>
                                    ))
                                    : null
                            }
                            {/* <pre>{JSON.stringify(recipeTitles, null, 2)}</pre> */}
                            {/* <pre>{JSON.stringify(recipesByIngred, null, 2)}</pre> */}
                        </>
                    )
            }
        </div>
    )
}
