// functions.js

import axios from 'axios'
import { ApiEndpoint, axiosHeaders } from '../common/constants'

export const sleep = ms => new Promise(resolve => 
    setTimeout(resolve, ms ?? 1000))

export const stripTags = (text = '') => text.replace(/<\/?[^>]+(>|$)/g, '')

export const dbSearch = async searchText => {
    const { urlSearch } = ApiEndpoint
    try {
        const data = await axios.post(
            urlSearch,
            { q: searchText.trim() },
            axiosHeaders
        )
            .then(({data}) => data)
        const { result } = data
        return result
    }
    catch (err) { console.error(25, { err }) }
    return false
}

export const dbGetRecipes = async () => {
    const { urlRecipes } = ApiEndpoint
    try {
        const data = await axios.get(
                urlRecipes,
                axiosHeaders
            )
            .then(({data}) => data)
        // console.log(30, data)
        return data
    }
    catch (err) { console.error(19, { err }) }
    return false
}

export const dbGetRecipe = async recipeId => {
    const { urlRecipe } = ApiEndpoint
    try {
        const data = await axios.get(
                `${urlRecipe}/${recipeId}`,
                axiosHeaders
            )
            .then(({data}) => data)
        // console.log(50, data)
        const { result } = data
        return result
    }
    catch (err) { console.error(19, { err }) }
}

export const dbGetRecipesByIngredient = async () => {
    const { urlByIngred } = ApiEndpoint
    try {
        const data = await axios.get(
            urlByIngred,
            axiosHeaders
        )
            .then(({data}) => data)
        console.log(66, data)
        let { result } = data || {}
        if (result) {
            result = Object
                .keys(result)
                .map(k => ([k, result[k]]))
                .sort((a, b) => a[0].toLowerCase() < b[0].toLowerCase() ? -1 : 1)
        }
        return result
    }
    catch (err) { console.error(19, { err }) }
    return false
}