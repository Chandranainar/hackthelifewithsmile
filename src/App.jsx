import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Letters from './pages/Letters'
import Poems from './pages/Poems'
import Philosophy from './pages/Philosophy'
import Lab from './pages/Lab'
import Music from './pages/Music'
import Now from './pages/Now'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="letters" element={<Letters />} />
                    <Route path="poems" element={<Poems />} />
                    <Route path="philosophy" element={<Philosophy />} />
                    <Route path="lab" element={<Lab />} />
                    <Route path="music" element={<Music />} />
                    <Route path="now" element={<Now />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
