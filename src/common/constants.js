// constants.js

export const API_TOKEN = process.env.REACT_APP_API_TOKEN

// export const baseApiUrl = 'https://recipes.greyling.info/api/v2'
export const baseApiUrl = 'https://recipeapi.greyling.tech/api/v2'

export const ApiEndpoint = {
    urlRecipes: `${baseApiUrl}/recipes`,
    urlRecipe: `${baseApiUrl}/recipe`,
    urlByIngred: `${baseApiUrl}/by-ingredient`,
    urlSearch: `${baseApiUrl}/search`,
}

export const axiosHeaders = {
    headers: {
      Authorization: `Basic ${API_TOKEN}`
    }
}