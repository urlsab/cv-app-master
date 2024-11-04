import React from 'react';
import Navbar from '../Navbar/Navbar';
import FastBuild from '../FastBuild/FastBuild';
import { useLayoutEffect } from 'react';
import './AtsTemplate.css';

const AtsTemplate = ({ setShowNavbar }) => {

    useLayoutEffect(() => {
        setShowNavbar(false);
    })

  return (
    <>
      <Navbar/>
      <FastBuild />
    </>
  )
}

export default AtsTemplate;