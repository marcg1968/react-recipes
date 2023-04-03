// SortableTitles.js

import React from 'react'
import { Link } from 'react-router-dom'
import { RecipeLI, RecipeUL } from './Builders'

export const SortableTitles = props => {

    const {
        data, // array of { _id, title }
    } = props

    return (
        <RecipeUL>
        {
            data
            .sort((a, b) => a.title < b.title ? -1 : 1)
            .map((e, i) => (
                <RecipeLI key={`title-${i}`}>
                    <Link to={`/recipe/${e._id}`}>{e.title}</Link>
                </RecipeLI>
            ))
        }
        </RecipeUL>
    )
}
