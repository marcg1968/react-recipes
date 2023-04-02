// App.js

import './App.css'
import { List } from './components/List'
import { Main } from './components/Main'
import { Recipe } from './components/Recipe'
import { Search } from './components/Search'
import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'

function App() {
    return (
        <div className='App'>
            <Navbar />
            <main>
                <Routes>
                    <Route path='/' element={ <Main /> } />
                    <Route path='/search' element={ <Search /> } />
                    <Route path='/list' element={ <List /> } />
                    <Route
                        path='/recipe/:id'
                        element={<Recipe />}
                        // loader={({ params }) => params.id}
                    />
                </Routes>
            </main>
        </div>
    )
}

export default App
