import React from 'react'
import ReactDOM from 'react-dom/client'

// theme
import{ThemeProvider} from 'styled-components'
import theme from './styles/theme'

// router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// components
import Menu from './components/Menu'
import Details from './pages/Details'

//Pages
import MoviesPage from './pages/MoviesPage'
import NotFound from './pages/NotFound'
import SearchPage from './pages/SearchPage'
import Favorites from './pages/Favorites'

//Global styles
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>

    <Router>

      <Menu />

      <Routes>
        <Route path='/' element={<MoviesPage />} />
        <Route path='/movies/:id' element={<Details />} />
        <Route path='/movies/search/:value' element={<SearchPage />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>

    </ThemeProvider>
  </React.StrictMode>,
)
