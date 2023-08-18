// App.js

import React, { createContext, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { theme } from './common/theme'
import { GlobalStyles } from './components/Builders'
import { List } from './components/List'
import { ListByIngredient } from './components/ListByIngredient'
import { Main } from './components/Main'
import { Navbar } from './components/Navbar'
import { Recipe } from './components/Recipe'
import { Search } from './components/Search'

export const RecipeContext = createContext(null)

function App() {

    const [recipeTitles, setRecipeTitles] = useState({})
    const [factorBtn,    setFactorBtn]    = useState(false)

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <RecipeContext.Provider
                value={[
                    recipeTitles,
                    setRecipeTitles,
                    factorBtn,
                    setFactorBtn,
                ]}
            >
                <main>
                    <Routes>
                        <Route path='/' element={ <Main /> } />
                        <Route path='/search' element={ <Search /> } />
                        <Route path='/list' element={ <List /> } />
                        <Route path='/list-by-ingredient' element={ <ListByIngredient /> } />
                        <Route
                            path='/recipe/:id'
                            element={<Recipe />}
                        />
                    </Routes>
                </main>
                <footer className='print-only'>
                    <p>URL: {window.location.href}</p>
                    <p>Printed: {(new Date()).toLocaleString()}</p>
                </footer>
                <Navbar /> {/* place here to ensure it appears on top of the stack */}
            </RecipeContext.Provider>
        </ThemeProvider>
    )
}

export default App
