import './App.css';
import React, { useState } from 'react';
import { UserAuthContextProvider } from "./Context/UserAuthContext";
import { Routes ,Route } from 'react-router-dom';
// import AllResumes from './Components/AllResumes/AllResumes';
import InputsForm from './Components/InputsForm/InputsForm';
import AtsTemplate from './Components/AtsTemplate/AtsTemplate';
import LoginApp from './Components/LoginApp/LoginApp';
import RegisterApp from './Components/RegisterApp/RegisterApp';
import Dashboard from './Components/Dashboard/Dashboard';
import Logout from './Components/Logout/Logout';
import Entry from './Components/Entry/Entry';
import About from './Components/About/About';
import Contact from './Components/Contact/Contact';
import FastBuild  from './Components/FastBuild/FastBuild';
import EntryNavbar from './Components/EntryNavbar/EntryNavbar';

const App = () => {

  const [showNavbar, setShowNavbar] = useState(true);

  return (
    <div className='appCon'>
      <React.Fragment>
        <UserAuthContextProvider>
        {showNavbar && <EntryNavbar/>}
          <Routes>
            <Route path='/login' element={<LoginApp/>} exact="true" />
            <Route path='/register' element={<RegisterApp/>} exact="true" />
            <Route path='/postInputs' element={<InputsForm setShowNavbar={setShowNavbar}/>} />
            <Route path='/atsTemplate' element={<AtsTemplate setShowNavbar={setShowNavbar}/>} />
            {/* <Route path='/postInputs/:id' element={<InputsForm/>} /> */}
            {/* <Route path='/allResumes' element={<AllResumes/> } exact="true" /> */}
            <Route path='/dashboard' element={<Dashboard setShowNavbar={setShowNavbar}/> } exact="true" />
            <Route path='/logout' element={<Logout setShowNavbar={setShowNavbar}/> } exact="true" />
            <Route path='/' element={<Entry setShowNavbar={setShowNavbar}/> } exact="true" />
            <Route path='/about' element={<About/> } exact="true" />
            <Route path='/contact' element={<Contact/> } exact="true" />
            <Route path='/fastBuild' element={<FastBuild/> } exact="true" />
            <Route path="/:id?" element={<FastBuild/>} exact="true" />
          </Routes>
        </UserAuthContextProvider>
      </React.Fragment>
    </div>
  );
}

export default App; 