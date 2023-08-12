// Search.js

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import debounce from 'lodash.debounce'
import { SearchDiv, Searchfield, SearchSection, MagnifyingGlass, SearchForm, SearchContainer, Spinner, ContainerSpinnerCentered } from './Builders'
import { SortableTitles } from './SortableTitles'
import { dbSearch, stripTags } from '../common/functions'

export const Search = () => {

    const [ searchText,     setSearchText ]     = useState('')
    const [ searchResult,   setSearchResult ]   = useState([])
    const [ searching,      setSearching ]      = useState(false)

    const doSearch = useCallback(async () => {
        if (searchText.trim().length < 3) {
            setSearchResult([]) /* clear search result state var */
            return
        }
        // await sleep(3000)
        try {
            setSearching(true)
            const result = await dbSearch(searchText)
            setSearchResult(result || [])
            setSearching(false)
        } catch (err) { console.error(25, { err }) }
    }, [searchText])

    useEffect(() => {
        doSearch()
    }, [doSearch]) /* NB dependency must be the const function */

    const handleSearchTextChange = evt => {
        const text = stripTags(evt.target.value).trim()
        setSearchText(text)
        doSearch()
    }

    const debouncedHandleSearchTextChange = useMemo(
        () => debounce(handleSearchTextChange, 1000),
        []
    )

    return (
        <SearchSection>
            <SearchDiv>Search:</SearchDiv>
            <SearchWithMagnifyingGlass changeHandler={debouncedHandleSearchTextChange} />
            {/* <SearchWithMagnifyingGlass changeHandler={handleSearchTextChange} /> */}
            {
                searching
                    ? (
                        <ContainerSpinnerCentered>
                            <Spinner />
                        </ContainerSpinnerCentered>
    
                    )
                    : null 
            }
            {
                // searchText && searchResult.length
                searchText && !searching
                    ? (
                        <>
                            <div>
                                Searching for the term "{searchText}" yielded {searchResult.length} items
                                {searchResult.length ? ':' : '.'}
                            </div>
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
                    autoFocus={true}
                    autocomplete="off"
                    autocorrect="off"
                    autocapitalize="off"
                    spellcheck={false}
                    onChange={changeHandler}
                />
            </SearchForm>
        </SearchContainer>
    )
}