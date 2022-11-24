import React from 'react';
import { NavLink } from 'react-router-dom';


const Logout = () => {
  return (
    <div>
      <h1> you just loged out</h1>
      <h3> to sing in again click here</h3>
      <NavLink to="/" className="underline text-tertiary">
            return to home page
        </NavLink>
    </div>
  )
}

export default Logout;
