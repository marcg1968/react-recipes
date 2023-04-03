// Search.js

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import debounce from 'lodash.debounce'
import { SearchDiv, Searchfield, SearchSection, MagnifyingGlass, SearchForm, SearchContainer } from './Builders'
import { ApiEndpoint } from '../common/constants'
import { SortableTitles } from './SortableTitles'

const { urlSearch } = ApiEndpoint

export const Search = () => {

    const [ searchText,   setSearchText ]   = useState('')
    const [ searchResult, setSearchResult ] = useState([])

    const doSearch = useCallback(async () => {
        if (searchText.trim().length < 3) {
            setSearchResult([]) /* clear search result state var */
            return
        }
        // await sleep(3000)
        try {
            const data = await axios.post(urlSearch, { q: searchText }).then(({data}) => data)
            const { result } = data
            setSearchResult(result)
        }
        catch (err) { console.error(25, { err }) }
    }, [searchText])

    useEffect(() => {
        doSearch()
    }, [doSearch]) /* NB dependency must be the const function */

    const handleSearchTextChange = evt => {
        const text = evt.target.value
        setSearchText(text.trim())
        debounce(doSearch, 6000)
    }

    const debouncedHandleSearchTextChange = useMemo(
        () => debounce(handleSearchTextChange, 1000),
        []
    )

    return (
        <SearchSection>
            <SearchDiv>Search:</SearchDiv>
            <SearchWithMagnifyingGlass changeHandler={debouncedHandleSearchTextChange} />
            {
                searchText && searchResult.length
                    ? (
                        <>
                            <div>Searching for the term "{searchText}" yielded {searchResult.length} items:</div>
                            <SortableTitles data={searchResult} />
                        </>
                    )
                    : null
            }
        </SearchSection>
    )
}

const SearchWithMagnifyingGlass = ({ changeHandler }) => {
    return (
        <SearchContainer>
            <MagnifyingGlass className='MagnifyingGlass'>
                {String.fromCharCode(0xD83D, 0xDD0D)}
            </MagnifyingGlass>            
            <SearchForm>
                <Searchfield
                    onChange={changeHandler}
                />
            </SearchForm>
        </SearchContainer>
    )
}