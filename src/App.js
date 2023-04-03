// App.js

// import './App.css'
import { List } from './components/List'
import { Main } from './components/Main'
import { Recipe } from './components/Recipe'
import { Search } from './components/Search'
import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import React, { createContext, useState } from 'react'
import { ListByIngredient } from './components/ListByIngredient'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from './components/Builders'
import { theme } from './common/theme'

export const RecipeListContext = createContext(null)

function App() {

    const [recipeTitles, setRecipeTitles] = useState({})

    return (
        // <div className='App'>
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <RecipeListContext.Provider value={[recipeTitles, setRecipeTitles]}>
                <Navbar />
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
            </RecipeListContext.Provider>
        </ThemeProvider>
    )
}

export default App
