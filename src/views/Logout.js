import React, { useEffect } from "react";
import { useDispatch } from 'react-redux'
import { unsetUser, setAlertMessage } from '../reducer';
import { useNavigate } from 'react-router-dom'


const Logout = ()=> {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(()=>{
        // send a request to set the value of the auth_token (jwt) to nothing
        fetch("http://localhost:3000/logout", { credentials: "include" } ).then(()=>{
            // unset the user in redux
            dispatch(unsetUser());
            // redirect to home
    
            dispatch(setAlertMessage({
                alertMessage: "You are logged out.",
                alertTheme: "success"
            }));
            setTimeout(()=>{
                navigate("/");
            },700)
        });
    },[])
    return(
        <div>
            <p className="large-message">Logging out...</p>
        </div>
    )
}

export default Logout;