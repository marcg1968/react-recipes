// List.js

import React, { useCallback, useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { ApiEndpoint } from '../common/constants'
// import { sleep } from '../common/functions'
import { SortableTitles } from './SortableTitles'
import { RecipeListContext } from '../App'

const { urlRecipes } = ApiEndpoint

// export const List = ({ setRecipeTitles }) => {
export const List = () => {

    const [loaded,       setLoaded]         = useState(false)
    // const [recipeTitles, setRecipeTitles]   = useState({})

    // const recipeTitles = useContext(RecipeListContext)
    // const recipeListContext = useContext(RecipeListContext)
    const [recipeTitles, setRecipeTitles] = useContext(RecipeListContext)
    console.log(21, {recipeTitles})

    const getRecipeTitles = useCallback(async () => {
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
                            <h1>Recipes</h1>
                            <SortableTitles data={recipeTitles} />
                            <pre>{JSON.stringify(recipeTitles, null, 2)}</pre>
                        </>
                    )
            }
        </div>
    )
}
