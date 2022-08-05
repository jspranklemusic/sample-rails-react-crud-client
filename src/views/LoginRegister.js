import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { FormField, Label, TextInput } from '../components/Form'
import { Button, ButtonsContainer } from '../components/Button';
import { H2 } from '../components/Text';
import { useDispatch } from 'react-redux'
import { setUser, setAlertMessage } from '../reducer';
import { useNavigate } from 'react-router-dom'

const Wrapper = styled.div`
    width: 100%;
    max-width: 420px;
    padding: 1rem;
    border-radius: 10px;
    background: var(--color-white);
    display: flex;
    flex-direction: column;
    margin: 2rem auto;
    animation: fadein 0.5s backwards;
`

const LoginForm = props => {
    const [showRegister, setShowRegister] = useState(false);
    const [fields, setFields] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const inputHandler = e => { 
        setFields({...fields, [e.target.id]: e.target.value})
    }

    useEffect(()=>{
        setFields({});
    },[showRegister])

    const handleSubmit = e => {
        e.preventDefault();
        if(showRegister){
            register();
        }else{
            login();
        }
    }

    const login = async ()=>{
        const response = await fetch('http://localhost:3000/login',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            credentials: "include",
            body: JSON.stringify({
                ...fields
            }),
        })
        const data = await response.json();
        if(!response.ok){
            dispatch(setAlertMessage({
                alertMessage: data.exception ? data.exception : data.error ? data.error : "There was an error",
                alertTheme: "error"
            }))
        }else{
            dispatch(setUser(data));
            dispatch(setAlertMessage({
                alertMessage: "Login Successful",
                alertTheme: "success"
            }))
            navigate("/");
        }
    }

    const register = async ()=>{
        if(fields.password != fields.password_confirmation){
            return dispatch(setAlertMessage({ alertMessage: "Passwords do not match." }))
        }
        if(fields.password.length < 8 || !/^(?=.*[0-8])(?=.*[A-Z]).*$/g.test(fields.password)){
            return dispatch(setAlertMessage({ alertMessage: "Password be 8 or more characters, have an uppercase letter, and a number." }))
        }
        const response = await fetch('http://localhost:3000/authors',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            credentials: "include",
            body: JSON.stringify({
                ...fields
            }),
        })
        const data = await response.json();
        if(!response.ok){
            dispatch(setAlertMessage({
                alertMessage: data.exception ? data.exception : data.error ? data.error : "There was an error",
                alertTheme: "error"
            }))
        }else{
            dispatch(setUser(data));
            dispatch(setAlertMessage({
                alertMessage: "Account Created",
                alertTheme: "success"
            }))
            navigate("/");
        }
    }

    return (
        <Wrapper>
            <H2>{showRegister ? 'Register' : 'Login'}</H2>
            <form onSubmit={handleSubmit}>
                {/* LOGIN VIEW  */}
               {!showRegister && <>
                    <FormField>
                        <Label htmlFor='email'>Email</Label>
                        <TextInput onChange={inputHandler}  required name='email' id='email' type='email'/>
                    </FormField>
                    <FormField>
                        <Label htmlFor='password'>Password</Label>
                        <TextInput onChange={inputHandler}  required name='password' id='password' type='password'/>
                    </FormField>
                    <ButtonsContainer>
                        <Button>Login</Button> <a onClick={()=>setShowRegister(true)} href='#'>Or Register</a>
                    </ButtonsContainer>
                </>}
                {/* REGISTER VIEW */}
                {showRegister && <>
                    <FormField>
                        <Label htmlFor='first_name'>First Name</Label>
                        <TextInput  onChange={inputHandler}  required name='first_name' id='first_name' type='first_name'/>
                    </FormField>
                    <FormField>
                        <Label htmlFor='last_name'>Last Name</Label>
                        <TextInput  onChange={inputHandler}   required name='last_name' id='last_name' type='last_name'/>
                    </FormField>
                    <FormField>
                        <Label htmlFor='email'>Email</Label>
                        <TextInput  onChange={inputHandler}  required name='email' id='email' type='email'/>
                    </FormField>
                    <FormField>
                        <Label htmlFor='password'>Password</Label>
                        <TextInput onChange={inputHandler}  required name='password' id='password' type='password'/>
                    </FormField>
                    <FormField>
                        <Label htmlFor='password_confirmation'>Repeat Password</Label>
                        <TextInput  onChange={inputHandler}  required name='password_confirmation' id='password_confirmation' type='password'/>
                    </FormField>
                    <ButtonsContainer>
                        <Button>Register</Button> <a onClick={()=>setShowRegister(false)} href='#'>Back to Login</a>
                    </ButtonsContainer>
                </>}
            </form>
        </Wrapper>
    )
}

export default LoginForm