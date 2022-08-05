import styled from "styled-components";

export const HazardsAndSafeguards = styled.div`
    display: grid;
    background: white;
    border-radius: 12px;
    padding: 1em;
    margin: 1rem 0;
    list-style: none;
    border: 2px solid rgb(220,220,220);
    grid-template-columns: 1fr 1fr;
    h3 {
        text-align: center;
        margin: 0;
        padding: 0;
        font-size: 1rem;
    }
    .left {
        border-right: 1px solid silver;
        padding-right: 1rem;
    }
    .right {
        padding-left: 1rem;
    }
    ul {
        margin-top: 1rem;
        padding: 0 1rem;
    }
    li {
        cursor: pointer;
        &:hover {
            text-decoration: 1px solid underline;
            &::after,&::before {
                content: "";
                width: 0.75rem;
                height: 1px;
                background: var(--color-black);
                position: absolute;
                top: 50%;
                right: -1.25rem;
                transform-origin: center;
            }
            &::after {
                transform: rotateZ(45deg);
            }
            &::before {
                transform: rotateZ(-45deg);
            }
        }
    }
`

export const BackText = styled.div`
    position: absolute;
    top: 1rem;
    left: 1rem;
`

export const Wrapper = styled.div`
    background: var(--color-white);
    border-radius: 10px;
    padding: 1rem;
    margin: 2rem auto;
    width: 100%;
    max-width: 650px;
    animation: fadein 0.5s backwards;
    h2 {
        text-align: center;
    }
`

export const Li = styled.li`
    font-weight: ${ props => props.selected == props.task ? "bold" : "normal" };
    width: 100%;
    cursor: pointer;
    &:hover {
        text-decoration: 1px solid underline;
        &::after {
            content: "View Item";
            position: absolute;
            font-size: 0.8rem;
            font-weight: normal;
            width: max-content;
            right: 0;
            top: 0;

        }
    }
    &.parent-li {
        background: white;
        border-radius: 12px;
        padding: 1em;
        margin: 1rem 0;
        list-style: none;
        border: 2px solid rgb(220,220,220);
    }
`