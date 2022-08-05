import styled from "styled-components";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAlertMessage, setConfirmMessage, unsetConfirmMessage } from "../reducer";


const Li = styled.li`
    word-break: break-word;
    border-bottom: 1px solid rgba(0,0,0,.2);
    padding-bottom: 1rem;
    background: white;
    border-radius: 12px;
    border: 2px solid rgb(220,220,220);
    padding: 1rem;
    list-style: none;
    h4,em,p {
        margin: 0;
    }
    h5 {
        text-transform: capitalize;
        text-align: center;
        margin: 1rem;

    }
    li {
        list-style: none;
    }
    .info-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;

    }
`

const ItemJHA = props => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch()
    const openConfirm = ()=> {
        dispatch(setConfirmMessage({
            confirmMessage: "Are you sure you want to delete this?",
            confirmFunction: ()=>{
                dispatch(unsetConfirmMessage());
                // TODO: make localhost set to a dynamic url
                fetch("http://localhost:3000/job_hazard_analyses/"+props.jha.id, {
                    method: "DELETE",
                    credentials: "include"
                }).then(response=>{
                    if(!response.ok){
                        dispatch(setAlertMessage({
                            alertMessage: "Could not delete item.",
                            alertTheme: "error"
                        }));
                    }else{
                        props.shiftItem();
                    }
                })
            }
         }))
    }
    return(
        <Li>
            <div className="info-header">
                <div className="left">
                    <h4>{props.jha.title}</h4>
                    <em>{props.jha.job.title}</em>
                    <p>by {props.jha.author.first_name} {props.jha.author.last_name}</p>
                </div>
                <div className="right">
                    <span><b>Date: </b>{new Date(props.jha.created_at).toLocaleDateString()}</span>
                </div>
               
            </div>
            <>
            <ul>
                {props.jha.tasks.map(task=>{
                const hazardsAndSafeguards = [];
                const length = Math.max(task.hazards.length, task.safeguards.length);
                for(let i = 0; i < length; i++){
                    hazardsAndSafeguards.push(
                        <tr>
                            {i < task.hazards.length && <td>{task.hazards[i].description}</td>}
                            {i < task.safeguards.length && <td>{task.safeguards[i].description}</td>}
                        </tr>
                    );
                }
                return (
                <li>
                    <h5>{task.description}</h5>
                    <table>
                        <tr>
                            <th>Hazards</th>
                            <th className="green">Safeguards</th>
                        </tr>
                        {hazardsAndSafeguards}
                    </table>
                </li>
                )})}
            </ul>
            </>
            {user && <div style={{marginTop: "2rem"}}>
                <Link to={"/edit/" + props.jha.id}>Edit</Link> <span onClick={openConfirm} className="link-style">Delete</span>
            </div>}
        </Li>
    )
}

export default ItemJHA