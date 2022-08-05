import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const H2 = styled.h2`
    text-align: center;
    margin: 0;
    margin-bottom: 1rem;
`

export const HeaderLink = styled(Link)`
    &:not(:hover){
        color: ${props => props.to == props.pathname ? "white" : "var(--color-main-light)"} !important;
    }
    text-decoration-style: ${props => props.to == props.pathname ? "solid" : "dotted"};
    font-size: 1rem;
    text-decoration-color: currentColor !important;
`