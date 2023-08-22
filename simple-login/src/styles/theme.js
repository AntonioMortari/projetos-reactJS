import {extendTheme} from '@chakra-ui/react'

// tema styled-components
const theme =  {
    colors:{
        primary:'#4a37eb',
        secondary:'#3cf6a2',
        bgmain:'#f6f6f6'
    }
}

// tema do chakra
const themeChakra = extendTheme({
    colors:{
        primary:'#4a37eb',
        secondary:'#3cf6a2',
        bgmain:'#f6f6f6'
    }
})

export {themeChakra, theme}