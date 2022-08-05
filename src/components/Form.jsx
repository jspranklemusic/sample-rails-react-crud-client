import styled from 'styled-components'
import React from 'react'

export const FormField = styled.div`
    margin: 1rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const TextInputElement = styled.input`
    border: 2px solid var(--lightgrey);
    border-radius: 100px;
    padding: .25rem .75rem;
    flex: 75%;
    transition: 0.1s;
    &:focus {
        outline: none;
        border: 2px solid var(--mediumgreen);
    }
    &.full {
        width: 100%;
        flex: 100%;
    }
`

export const FormSection = styled.div`
border-bottom: 2px solid var(--lightgrey);
padding: 1rem;

&.grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1rem;
    &-left, &-right {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 1rem;
    }
    
    input {
        width: 100%;
    }
  
}

`

export const Label = styled.label`
    flex: 25%;
`



export const TextInput = props => {
    const enterPress = e => {
        if(e.key == "Enter" && !!props.enterPress){
            props.enterPress()
        }
    }
    return(<TextInputElement onKeyDown={e => enterPress(e)} {...props}/>)
};