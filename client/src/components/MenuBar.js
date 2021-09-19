import React from "react";
import { NavLink } from "react-router-dom";

export default function MenuBar() {
  return (
    <>
      <div className='ui secondary pointing menu '>
        <NavLink to='/' className='item' activeClassName='active'>
          Home
        </NavLink>

        <div className='right menu'>
          <NavLink to='/register' className='item' activeClassName='active'>
            Register
          </NavLink>
          <NavLink to='/login' className='ui item' activeClassName='active'>
            Login
          </NavLink>
        </div>
      </div>
    </>
  );
}
