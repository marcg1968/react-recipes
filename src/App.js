// App.js

import './App.css'
import { Main } from './components/Main'
import { Search } from './components/Search'
// import { createContext } from 'react'
import { Routes, Route, Link } from 'react-router-dom'

function App() {
    return (
        <div className='App'>
            <header>
                <Link to='/'>HOME</Link>
                &nbsp; | &nbsp;
                <Link to='/search'>Search</Link>
            </header>
            <main>
                <Routes>
                    <Route path='/' element={ <Main /> } />
                    <Route path='/search' element={ <Search /> } />
                </Routes>
            </main>
        </div>
    )
}

export default App
