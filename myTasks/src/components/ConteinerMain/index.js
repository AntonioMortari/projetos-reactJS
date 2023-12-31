import styled from 'styled-components'

const Main = styled.main`
  background-color: ${({ theme }) => theme.COLORS.white};
  
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.212);
  margin:50px;
  display: flex;

  >.action{
    
    >div{
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    >.number-task{
      color: ${({ theme }) => theme.COLORS.blue};
    }
  }
`

export default Main