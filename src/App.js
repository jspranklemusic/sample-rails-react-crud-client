
import './App.css';
import CreateEditJHA from './views/CreateEditJHA';
import LoginRegister from './views/LoginRegister';
import ViewJHA from './views/ViewJHA';
import Logout from './views/Logout';
import React, { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { unsetAlertMessage, unsetConfirmMessage, setUser } from './reducer';
import Alert from './components/Alert';
import Confirm from './components/Confirm';
import { HeaderLink } from './components/Text';

function App() {
  const [checkingUser, setCheckingUser] = useState(true);
  const user = useSelector(state => state.user);
  const alertTheme = useSelector(state => state.alertTheme);
  const alertMessage = useSelector(state => state.alertMessage);
  const confirmMessage = useSelector(state => state.confirmMessage);
  const confirmFunction = useSelector(state => state.confirmFunction);
  const location = useLocation();
  const dispatch = useDispatch();
  
  // check to see if the user has a JWT authorization cookie
  useEffect(()=>{
    fetch("http://localhost:3000/login",{credentials:"include"}).then(response=>{
      if(response.ok){
        response.json().then(data=>{
          dispatch(setUser(data));
          setCheckingUser(false);
        })
      }else{
        setCheckingUser(false);
      }
    })
  },[])

  const HomeMessage = (
    <>
    {/* IF NOT LOGGED iN */}
    {!user &&<>
    <div className='large-message wrapped'>
    <h2>Welcome, Guest.</h2>
      This is your portal for managing Job Hazard Analyses (JHA). Feel free to browse the existing Job Hazard Analyses, or login to create, edit, or delete a Job Hazard Analysis. 
    </div>
    </>}
    {/* IF LOGGED IN */}
    {user &&<>
    <div className='large-message wrapped'>
    <h2>Welcome, {user.first_name}.</h2>
      This is your portal for managing Job Hazard Analyses (JHA). Feel free to browse the existing Job Hazard Analyses, or create, edit, or delete a Job Hazard Analysis. 
    </div>
    </>}
    </>);
  return (
    !checkingUser && <div className="app">
      <header className="app-header">
        {/* HEADER AND LINKS */}
          <h1>JHA Central</h1>
          <HeaderLink pathname={location.pathname} to="/">Home</HeaderLink> |&nbsp;
          {user && <><HeaderLink pathname={location.pathname} to="/create">Create JHA</HeaderLink> |&nbsp;</>}
          <HeaderLink pathname={location.pathname} to="/view">View JHAs</HeaderLink> |&nbsp;
          {!user && <HeaderLink pathname={location.pathname} to="/login">Login</HeaderLink>}
          {user && <HeaderLink pathname={location.pathname} to="/logout">Logout</HeaderLink>}
      </header>
      {/* ROUTES */}
      <Routes>
        <Route path="/" element={HomeMessage} />
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/create" element={<CreateEditJHA new={true}/>}/>
        <Route path="/edit/:id" element={<CreateEditJHA new={false}/>}/>
        <Route path="/view" element={<ViewJHA/>}/>
        <Route path="/login" element={<LoginRegister/>}/>
      </Routes>
      {/* ERROR MESSAGES/ALERTS AND CONFIRM DIALOG */}
      {alertMessage && <Alert alertTheme={alertTheme} hide={()=>dispatch(unsetAlertMessage())}>{alertMessage}</Alert>}
      {confirmMessage && <Confirm cancel={()=>dispatch(unsetConfirmMessage())} confirm={()=>confirmFunction()}>{confirmMessage}</Confirm>}
    </div>
  );
}

export default App;
