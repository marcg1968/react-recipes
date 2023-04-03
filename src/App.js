// App.js

import './App.css'
import { List } from './components/List'
import { Main } from './components/Main'
import { Recipe } from './components/Recipe'
import { Search } from './components/Search'
import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import React, { createContext, useState } from 'react'

export const RecipeListContext = createContext(null)

function App() {

    const [recipeTitles, setRecipeTitles] = useState({})

    return (
        <div className='App'>
            <RecipeListContext.Provider value={[recipeTitles, setRecipeTitles]}>
                <Navbar />
                <main>
                    <Routes>
                        <Route path='/' element={ <Main /> } />
                        <Route path='/search' element={ <Search /> } />
                        <Route path='/list' element={ <List /> } />
                        <Route
                            path='/recipe/:id'
                            element={<Recipe />}
                        />
                    </Routes>
                </main>
            </RecipeListContext.Provider>
        </div>
    )
}

export default App
