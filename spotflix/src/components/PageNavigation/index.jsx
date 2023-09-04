import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

import styled from 'styled-components'


const PageNavigation = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    >svg{
        font-size: 2rem;
        cursor: pointer;
    }
`

function ComponentPageNavigation({page, statePage}) {
    return (
        <PageNavigation>
            <FaAngleLeft onClick={() => {
                page > 1 && statePage(prevPage => prevPage - 1)
                window.scrollTo(0,0)
            }} />

            {page}
            <FaAngleRight onClick={() => {
                page < 500 && statePage(prevPage => prevPage + 1)
                window.scrollTo(0,0)
            }} />
        </PageNavigation>
    );
}

export default ComponentPageNavigation;