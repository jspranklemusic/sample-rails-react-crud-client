import React, { useState } from "react";
import { Button, ButtonsContainer } from "./Button";
import styled from 'styled-components'

const ConfirmWrapper = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--color-white);
    width: 20rem;
    padding: 1rem;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 3px 3px 5px 2px rgba(0,0,0,.2);
    animation: ${props => !props.closing 
        ? 'fadein-slide-transform-centerX backwards 0.4s' : 
        'fadeout-slide-transform-centerX forwards 0.4s'};
    h4, p {
        padding: 0;
        margin: 0;
        margin-bottom: -.5rem;
    }
    p {
        margin-top: 1rem;
        margin-bottom: -1rem;
    }
`

const Confirm = props => {
    const [closing, setClosing] = useState(false);
    const close = func => {
        setClosing(true);
        setTimeout(()=>{
            func();
        },400)
    }
    return( 
        <ConfirmWrapper closing={closing}>
            <h4>Confirm</h4>
            <p>{props.children}</p>
            <ButtonsContainer>
                <Button className="secondary" onClick={()=>close(props.cancel)}>Cancel</Button>
                <Button onClick={()=>close(props.confirm)}>Confirm</Button>
            </ButtonsContainer>
        </ConfirmWrapper>
    )
}

export default Confirm;