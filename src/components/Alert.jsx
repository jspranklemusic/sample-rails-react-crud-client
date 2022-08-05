import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    position: fixed;
    top: 1rem;
    left: 50%;
    background: ${props => props.color ? props.color : "#498636"};
    color: white;
    padding: .5rem 1rem;
    border-radius: 5px;
    box-shadow: 3px 3px 5px rgba(0,0,0,.75;)
    cursor: pointer;
    min-width: 15rem;
    width: max-content;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateX(-50%) translateY(0);
    animation ${props => !props.leaving ? 'slidedown-centered .5s backwards' : 'fadeout .25s forwards'};
    cursor: pointer;
    &:hover {
        opacity: 0.9;
    }

`

const themesMap = {
    error: "#c03029",
    success: "#498636"
};

const Alert = props => {
    const [leaving, setLeaving] = useState(false);
    // do fade/slide animation before closing
    const hide = ()=> {
        setLeaving(true);
        setTimeout(()=>{
            props.hide()
        },500)
    }
    useEffect(()=>{
        setTimeout(()=>{
            hide()
        },2500)
    },[])
    return(
        <Wrapper 
            color={props.alertTheme ? themesMap[props.alertTheme] : themesMap.error} 
            leaving={leaving} 
            onClick={hide}>
            <span>{props.children}</span> 
        </Wrapper>
    )
}

export default Alert;