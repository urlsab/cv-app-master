import './App.css';

import React from 'react';

import { Routes ,Route } from 'react-router-dom';

import AllResumes from './Components/AllResumes/AllResumes';
import InputsForm from './Components/InputsForm/InputsForm';
import LoginApp from './Components/LoginApp/LoginApp';
import RegisterApp from './Components/RegisterApp/RegisterApp';

import Dashboard from './Components/Dashboard/Dashboard';
import NotUser from './Components/NotUser/NotUser';
import Logout from './Components/Logout/Logout';
import GotNewPassword from './Components/GotNewPassword/GotNewPassword';

const App = () => {

  return (
      <React.Fragment>
        <Routes>
          <Route path='/' element={<LoginApp/>} exact="true" />
          <Route path='/register' element={<RegisterApp/>} exact="true" />
          <Route path='/notUser' element={<NotUser/>} exact="true" />
          <Route path='/gotNewPassword' element={<GotNewPassword/>} exact="true" />
          <Route path='/postInputs' element={<InputsForm/>} exact="true" />
          <Route path='/allResumes' element={<AllResumes/> } exact="true" />
          <Route path='/dashboard' element={<Dashboard/> } exact="true" />
          <Route path='/logout' element={<Logout/> } exact="true" />
        </Routes>
      </React.Fragment>
  );
  
}

export default App; 