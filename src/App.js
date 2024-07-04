import './App.css';
import React from 'react';
import { UserAuthContextProvider } from "./Context/UserAuthContext";
import { Routes ,Route } from 'react-router-dom';
import AllResumes from './Components/AllResumes/AllResumes';
import InputsForm from './Components/InputsForm/InputsForm';
import LoginApp from './Components/LoginApp/LoginApp';
import RegisterApp from './Components/RegisterApp/RegisterApp';
import Dashboard from './Components/Dashboard/Dashboard';
import Logout from './Components/Logout/Logout';
import GotNewPassword from './Components/GotNewPassword/GotNewPassword';
import Entry from './Components/Entry/Entry';
import Examples from './Components/Examples/Examples';
import About from './Components/About/About';
import Contact from './Components/Contact/Contact';
import ErrorNoAccount from './Components/ErrorNoAccount/ErrorNoAccount';
import FastBuild from './Components/FastBuild/FastBuild';

const App = () => {

  return (
    <React.Fragment>
      <UserAuthContextProvider>
        <Routes>
          <Route path='/login' element={<LoginApp/>} exact="true" />
          <Route path='/register' element={<RegisterApp/>} exact="true" />
          <Route path='/gotNewPassword' element={<GotNewPassword/>} exact="true" />
          <Route path='/postInputs' element={<InputsForm/>} exact="true" />
          <Route path='/allResumes' element={<AllResumes/> } exact="true" />
          <Route path='/dashboard' element={<Dashboard/> } exact="true" />
          <Route path='/examples' element={<Examples/> } exact="true" />
          <Route path='/logout' element={<Logout/> } exact="true" />
          <Route path='/errorNoAccount' element={<ErrorNoAccount/> } exact="true" />
          <Route path='/' element={<Entry/> } exact="true" />
          <Route path='/about' element={<About/> } exact="true" />
          <Route path='/contact' element={<Contact/> } exact="true" />
          <Route path='/fastBuild' element={<FastBuild/> } exact="true" />
        </Routes>
      </UserAuthContextProvider>
    </React.Fragment>
  );
}

export default App; 