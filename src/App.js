import React from 'react';
import { Routes ,Route } from 'react-router-dom';

import './App.css';
import PostUserInput from './Components/FullProfile/PostUserInput';
import PullData from './Components/PullData/PullData';
import Navbar from './Components/Navbar/Navbar';
import ResumesFirestore from './Components/ResumesFirestore/ResumesFirestore';
import AddToFirestore from './Components/AddToFirestore/AddToFirestore';
import EditToFirestore from './Components/EditToFireStore/EditToFirestore';

import TryCodes from './Components/TryCodes/TryCodes';
import TryPackages from './Components/TryPackages/TryPackages';

const App = () => {
  return (
      <React.Fragment>
        <Navbar/>
        <Routes>
          <Route path='/allData' element={<PullData/>} exact="true" />
          <Route path='/postInput' element={<PostUserInput/>} exact="true" />
        </Routes>
        <TryPackages/> 
        <ResumesFirestore/>
        <AddToFirestore/>
        <EditToFirestore/>
      </React.Fragment>
  );
}

export default App; 