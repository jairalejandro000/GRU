import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Panel from '../pages/panel/panel';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaRegUserCircle } from 'react-icons/fa';

import './style.css';

export default function navBar(){
  const openNav = () => {
    document.getElementById('mySidebar').style.width = '250px';
    document.getElementById('main').style.marginLeft = '250px';
  }
  const closeNav = () => {
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
        <a className='closebtn' onClick={closeNav}>x</a>
        <a onClick={logIn}>About</a>
        <a onClick={signUp}>Services</a>
        <a onClick={ShowHistory}>Historial</a>
      </div>
      <div id='main'>
        <div className='toolbar'>
          <button className='openbtn' onClick={openNav}><GiHamburgerMenu/></button> 
          <FaRegUserCircle />
        </div>
        <Routes>
            <Route path='/' element={<Panel/>}/>
            <Route path='*' element={<Panel/>}/>
        </Routes>
      </div>
    </div>
  );
};