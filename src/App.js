import './App.css';
import React from 'react';
import { Routes ,Route } from 'react-router-dom';

import Navbar from './Components/Navbar/Navbar';
import AllResumes from './Components/AllResumes/AllResumes';
import PdfResume from './Components/PdfResume/PdfResume';
import InputsForm from './Components/InputsForm/InputsForm';
import SubmitInputFormRoute from './Components/SubmitInputFormRoute/SubmitInputFormRoute';
import CreatePdfResume from './Components/CreatePdfResume/CreatePdfResume';
// import EditToFirestore from './Components/EditToFireStore/EditToFirestore';

const App = () => {
  return (
      <React.Fragment>
        <Navbar/>
        <Routes>
          <Route path='/' element={<h1>Wellcome !!!</h1>} exact="true" />
          <Route path='/postInput' element={<SubmitInputFormRoute/>} exact="true" />
          <Route path='/allResumes' element={<AllResumes/> } exact="true" />
          <Route path='/createPdfResume' element={<CreatePdfResume/> } exact="true" />
          {/*maybe add: <Route path='/allResumes/:id' element={<AllResumes/> } exact="true" /> */}
          {/* <Route path='/inputForm' element={<InputsForm/> } exact="true" /> */}
        </Routes>
        
        {/* <EditToFirestore/> */}
      </React.Fragment>
  );
}

export default App; 