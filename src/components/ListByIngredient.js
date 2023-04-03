// ListByIngredient.js

import React, { useCallback, useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { ApiEndpoint } from '../common/constants'
// import { sleep } from '../common/functions'
import { RecipeListContext } from '../App'
import { Header4 } from './Builders'
import { Link } from 'react-router-dom'

const {
    urlByIngred,
    urlRecipes,
} = ApiEndpoint

export const ListByIngredient = () => {

    const [ loaded,          setLoaded ]          = useState(false)
    const [ recipesByIngred, setRecipesByIngred ] = useState({})

    const [ recipeTitles, setRecipeTitles] = useContext(RecipeListContext)

    const getRecipesByIngred = useCallback(async () => {
        // await sleep(3000)
        try {
            const data = await axios.get(urlByIngred).then(({data}) => data)
            console.log(27, data)
            let { result } = data || {}
            if (result) {
                result = Object
                    .keys(result)
                    .map(k => ([k, result[k]]))
                    .sort((a, b) => a[0].toLowerCase() < b[0].toLowerCase() ? -1 : 1)
            }
            setRecipesByIngred(result)
            setLoaded(true)
        }
        catch (err) { console.error(19, { err }) }
    }, [])

    useEffect(() => {
        getRecipesByIngred()
    }, [getRecipesByIngred]) /* NB dependency must be the const function */

    const getRecipeTitles = useCallback(async () => { /* TODO: handle duplication, i.e. also present in List.js  */
        // await sleep(3000)
        try {
            const data = await axios.get(urlRecipes).then(({data}) => data)
            console.log(27, data)
            setRecipeTitles(data)
            setLoaded(true)
        }
        catch (err) { console.error(19, { err }) }
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
                            <h1>By ingredient</h1>
                            {/* <SortableTitles data={recipeTitles} /> */}
                            {
                                Object.keys(recipeTitles).length && recipesByIngred
                                    ? recipesByIngred.map((e, i) => (
                                        <div key={`byingred-${i}`}>
                                            <Header4 align={'left'}>
                                                {e[0]}
                                            </Header4>
                                            {/* <pre>{JSON.stringify(e[1], null, 2)}</pre> */}
                                            <ul>
                                            {
                                                e[1].map((r, n) => {
                                                    const found = recipeTitles.find(f => f._id === r)
                                                    const { title } = found || {}
                                                    return (
                                                        <li key={`rec-${i}-${n}`}>
                                                            <Link to={`/recipe/${r}`}>{title}</Link>
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
