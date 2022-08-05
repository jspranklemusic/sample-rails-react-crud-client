import styled from 'styled-components'

export const ButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
    & > * {
        margin: 0 0.5rem;
    }
`
export const Button = styled.button`
    padding: .5rem 1rem;
    border: none;
    border-radius: 100px;
    background: var(--mediumgreen);
    color: white;
    font-weight: bold;
    transition: 0.1s;
    cursor: pointer;
    &:hover {
        background: var(--darkgreen);
    }
    &:active {
        background: var(--darkergreen);
    }
    &.secondary {
        background: white;
        border: 2px solid var(--mediumgreen);
        color: var(--mediumdarkgreen);
        padding: .4rem .8rem;
        &:hover {
            color: var(--darkergreen);
            border-color: var(--darkergreen);
            background-color: var(--color-main-light);
        }
        &:active {
        }
    }
`

export const Close = styled.button`
    width: .9rem;
    height: .9rem;
    border: 2px solid var(--color-greygreen);
    background: white;
    border-radius: 50%;
    margin: 0;
    top: -.3rem;
    padding: 0;
    cursor: pointer;
    &::after {
        content: "";
        width: 75%;
        height: 2px;
        background: var(--color-greygreen);
        position: absolute;
        top: calc(50% - 1px);
        left: 12.5%;
    }
    &.light {
        border: 2px solid var(--color-white);
        background: transparent;
        &::after {
            background: var(--color-white);
        }
    }
`