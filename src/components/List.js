// List.js

import React, { useCallback, useEffect, useState, useContext } from 'react'
// import { sleep } from '../common/functions'
import { SortableTitles } from './SortableTitles'
import { RecipeListContext } from '../App'
import { MainHeader } from './Builders'
import { dbGetRecipes } from '../common/functions'

export const List = () => {

    const [ loaded, setLoaded ] = useState(false)

    const [ recipeTitles, setRecipeTitles] = useContext(RecipeListContext)

    const getRecipeTitles = useCallback(async () => {
        // await sleep(3000)
        const data = await dbGetRecipes()
        setRecipeTitles(data || [])
        setLoaded(true)
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
                            <MainHeader>Recipes</MainHeader>
                            <SortableTitles data={recipeTitles} />
                            {/* <pre>{JSON.stringify(recipeTitles, null, 2)}</pre> */}
                        </>
                    )
            }
        </div>
    )
}
