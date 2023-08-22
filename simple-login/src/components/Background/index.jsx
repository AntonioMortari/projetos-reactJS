import styled from 'styled-components'

const Background = styled.div`
    min-height: 100vh;
    
    background-image: linear-gradient(135deg, ${({theme}) => theme.colors.secondary} 5%, ${({theme}) => theme.colors.primary});
    
    display: flex;
    align-items: center;
    justify-content: center;
`

export default Background