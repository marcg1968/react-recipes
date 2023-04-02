// SortableTitles.js

import React from 'react'

export const SortableTitles = props => {

    const {
        data, // array of { _id, title }
    } = props

    return (
        <div>
            <ul>
            {
                data
                .sort((a, b) => a.title < b.title ? -1 : 1)
                .map((e, i) => (
                    <li key={`title-${i}`}>
                        <a href={`/recipe/${e._id}`}>{e.title}</a>
                    </li>
                ))
            }
            </ul>
        </div>
    )
}
