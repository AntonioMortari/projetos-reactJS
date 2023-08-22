import React from 'react'
import ReactDOM from 'react-dom/client'
import styled from 'styled-components'

import GlobalStyles  from './styles/global'

// tema
import { ThemeProvider } from 'styled-components'
import {theme} from './styles/theme'
import { themeChakra } from './styles/theme'

// chakraUI
import { ChakraProvider } from '@chakra-ui/react'

import App from './App'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <ChakraProvider theme={themeChakra} resetCSS={false} >

      <ThemeProvider theme={theme}>
        <GlobalStyles />
      
          <App />
        

      </ThemeProvider>

    </ChakraProvider>

  </React.StrictMode>,
)
