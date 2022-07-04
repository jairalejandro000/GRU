import React from 'react';
import { Route, Routes, NavLink, useNavigate } from 'react-router-dom';

import Panel from '../pages/panel/panel';
import Users from '../pages/panel/users';

import { GiHamburgerMenu } from 'react-icons/gi';
import { FaUserAlt } from 'react-icons/fa';
import { BiHomeAlt } from 'react-icons/bi';
import { FaRegUserCircle } from 'react-icons/fa';

import './style.css';
import gru from '../assets/gru.png';

export default function SideBar(){
  const navigate = useNavigate();
  const clickButton = () => {
    var px = document.getElementById('mySidebar').style.width
    if(px === '0px'){
      openNav()
    }else{
      closeNav()
    }
  }
  const openNav = () => {
    document.getElementById('mySidebar').style.width = '250px';
    document.getElementById('main').style.marginLeft = '250px';
  }
  const closeNav = () => {
    document.getElementById('mySidebar').style.width = '0';
    document.getElementById('main').style.marginLeft= '0';
  }
  const dropDown = () => {
    console.log("prueba")
    document.getElementById('myDropdown').classList.toggle('show');
  }
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName('dropdown-content');
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
  const profile = () => {
    console.log("ver perfil");
  }
  const logOut = () => {
    localStorage.clear();
    navigate('/');
  }
  const ranking = () => {
    navigate('/panel/panel')
  }
  var role = atob(localStorage.getItem('user'));
  var a = false;
  if(role === 'minion'){
    a = false;
  }else{
    a = true;
  }
  return (
    <div>
      <div id='mySidebar' className='sidebar'>
        <button className='home' onClick={ranking}>
        <BiHomeAlt size={35}/>
        </button>
        {a ? <NavLink to='/panel/users'>Usuarios</NavLink> : null}
        {a ? <NavLink to='/auth/login'>Indicadores</NavLink> : null}
        {a ? <NavLink to='/auth/login'>Categorías</NavLink> : null}
      </div>
      <div id='main' className='main'>
        <div className='toolbar'>
          <GiHamburgerMenu className='openbtn' onClick={clickButton}/>
          <h1 style={{fontSize: 50, margin: 20, color: 'white', display: 'inline'}}>GRU</h1>
          <p style={{fontSize: 20,margin: 20, color: 'white', display: 'inline'}}>Sistema de Gestion de Rendimiento Umano</p>
          <div className='dropdown' style={{float: 'right', margin: 20, display: 'inline'}}>
            <FaUserAlt size={35} className='user dropbtn' onClick={dropDown}/>
            
            <div id='myDropdown' className='dropdown-content'>
              <a onClick={profile}>Perfil</a>
              <a onClick={logOut}>Cerrar sesión</a>
            </div>
          </div>
        </div>
        <Routes>
            <Route path='panel' element={<Panel/>}/>
            <Route path='users' element={<Users/>}/>
            <Route path='*' element={<Panel/>}/>
        </Routes>
      </div>
    </div>
  );
};