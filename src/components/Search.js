// Search.js

import React, { useState } from 'react'
import { debounce } from '../common/functions'
import { Searchfield } from './Builders'

export const Search = () => {

    const [ searchText, setSearchText ] = useState(null)

    const task = async text => {
        setSearchText(text)
    }

    const handleSearchTextChange = evt => {
        const text = evt.target.value
        // setSearchText(text)
        // debounce(() => task(text), 5000)
        debounce(() => setSearchText(`-${text}-`), 5000)
    }
    

    return (
        <div>
            <div>{searchText}</div>
            Search:
            <Searchfield
                onChange={handleSearchTextChange}
                // onChange={(evt) => console.log(28, evt.target.value)}
                onClick={(evt) => console.log(29, evt.target.value)}
            />
        </div>
    )
}
