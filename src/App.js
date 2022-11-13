import './App.css';
import React from 'react';
import { Routes ,Route } from 'react-router-dom';

import Navbar from './Components/Navbar/Navbar';
import AllResumes from './Components/AllResumes/AllResumes';
import AddResume from './Components/AddResume/AddResume';
// import EditToFirestore from './Components/EditToFireStore/EditToFirestore';

const App = () => {
  return (
      <React.Fragment>
        <Navbar/>
        <Routes>
          <Route path='/' element={<h1>well come</h1>} exact="true" />
          <Route path='/postInput' element={<AddResume/>} exact="true" />
          <Route path='/allResumes' element={<AllResumes/> } exact="true" />
        </Routes>
        
        {/* <EditToFirestore/> */}
      </React.Fragment>
  );
}

export default App; 