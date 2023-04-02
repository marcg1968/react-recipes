// SortableTitles.js

import React from 'react'
import { Link } from 'react-router-dom'

export const SortableTitles = props => {

    const {
        data, // array of { _id, title }
    } = props

    return (
        <ul>
        {
            data
            .sort((a, b) => a.title < b.title ? -1 : 1)
            .map((e, i) => (
                <li key={`title-${i}`}>
                    <Link to={`/recipe/${e._id}`}>{e.title}</Link>
                </li>
            ))
        }
        </ul>
    )
}
