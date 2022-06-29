import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Panel from '../pages/panel/panel';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaRegUserCircle } from 'react-icons/fa';

import './style.css';

export default function SideBar(){
  const [value, setHidden] = React.useState({
    showBurguer: true
  });
  function handleChange(val) {
    //const { target } = evt;
    //const { showBurguer, value } = target;
    const newValues = {
      ['showBurguer']: val,
    };
    setHidden(newValues);
  }
  const openNav = () => {
    handleChange(false);
    document.getElementById('mySidebar').style.width = '250px';
    document.getElementById('main').style.marginLeft = '250px';
  }
  const closeNav = () => {
    handleChange(true);
    document.getElementById('mySidebar').style.width = '0';
    document.getElementById('main').style.marginLeft= '0';
  }
  const logIn = () => {
    console.log('login')
  }
  const signUp = () => {
    console.log('signup')
  }
  const ShowHistory = () => {
    console.log('history')
  }
  return (
    <div>
      <div id='mySidebar' className='sidebar'>
        <a className='closebtn' onClick={closeNav}><GiHamburgerMenu/></a>
        <a onClick={logIn}>About</a>
        <a onClick={signUp}>Services</a>
        <a onClick={ShowHistory}>Historial</a>
      </div>
      <div id='main'>
        <div className='toolbar'>
        {value.showBurguer ? <button className='openbtn' onClick={openNav}><GiHamburgerMenu/></button>  : null}
          <FaRegUserCircle styles={'color: white'}/>
        </div>
        <Routes>
            <Route path='/' element={<Panel/>}/>
            <Route path='*' element={<Panel/>}/>
        </Routes>
      </div>
    </div>
  );
};