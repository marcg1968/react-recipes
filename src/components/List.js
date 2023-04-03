// List.js

import React, { useCallback, useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { ApiEndpoint } from '../common/constants'
// import { sleep } from '../common/functions'
import { SortableTitles } from './SortableTitles'
import { RecipeListContext } from '../App'
import { MainHeader } from './Builders'

const { urlRecipes } = ApiEndpoint

export const List = () => {

    const [ loaded, setLoaded ] = useState(false)

    const [ recipeTitles, setRecipeTitles] = useContext(RecipeListContext)

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
                            <MainHeader>Recipes</MainHeader>
                            <SortableTitles data={recipeTitles} />
                            {/* <pre>{JSON.stringify(recipeTitles, null, 2)}</pre> */}
                        </>
                    )
            }
        </div>
    )
}
