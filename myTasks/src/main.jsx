import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import GlobalStyles from './styles/global'

// theme
import { ThemeProvider } from 'styled-components'
import theme from './styles/theme'

//pages
import Home from './pages/Home'
import AddTask from './pages/AddTask'
import DetailsTask from './pages/DetailsTask'


ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <GlobalStyles />

    <Router>

      
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/addTask' element={<AddTask />} />
          <Route path='/tasks/:id' element={<DetailsTask />} />
        </Routes>

    </Router>



  </ThemeProvider>
)
