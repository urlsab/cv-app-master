import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, useRouteError } from 'react-router-dom';
import './index.css';
import App from './App';
// import Dashboard from './Components/Dashboard/Dashboard';
import reportWebVitals from './reportWebVitals';
// import RegisterApp from './Components/RegisterApp/RegisterApp';
// import LoginApp from './Components/LoginApp/LoginApp';
// import InputsForm from './Components/InputsForm/InputsForm';
// import AllResumes from './Components/AllResumes/AllResumes';

const router = createBrowserRouter([
  {
    path: "*",
    element: <App/>
    //,
    // children: [
    //   {
    //     path: "register",
    //     element: <RegisterApp />,
    //   },
    //   {
    //     path: "login",
    //     element: <LoginApp />,
    //   },
    //   {
    //     path: "Dashboard",
    //     element: <Dashboard />,
    //   },
    //   {
    //     path: "postInputs",
    //     element: <InputsForm />,
    //   },
    //   {
    //     path: "allResumes",
    //     element: <AllResumes/>,
    //   },
      
    // ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  //<React.Fragment>
  // remember that it was <React.strictMode> component
  <React.Fragment>
    <RouterProvider router={router} />
  </React.Fragment>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();