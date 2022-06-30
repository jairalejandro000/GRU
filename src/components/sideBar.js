import React from 'react';
import { Route, Routes, NavLink } from 'react-router-dom';

import Panel from '../pages/panel/panel';
import Users from '../pages/panel/users';

import { GiHamburgerMenu } from 'react-icons/gi';
import { FaUserCircle } from 'react-icons/fa';

import './style.css';
import gru from '../assets/gru.png';

export default function SideBar(){
  const [value, setHidden] = React.useState({
    showBurguer: true
  });
  function handleChange(val) {
    const newValues = {
      ['showBurguer']: val
    };
    setHidden(newValues);
  }
  const clickButton = () => {
    if(value.showBurguer === true){
      openNav()
    }else{
      closeNav()
    }
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
        <img src={gru} style={{width: 150, height: 'auto'}}/>
        <NavLink to='/auth/login'>Ranking</NavLink>
        {a ? <NavLink to='panel/panel/users'>Usuarios</NavLink> : null}
        {a ? <NavLink to='/auth/login'>Indicadores</NavLink> : null}
        {a ? <NavLink to='/auth/login'>Categorías</NavLink> : null}
      </div>
      <div id='main' className='main'>
        <div className='toolbar'>
        <GiHamburgerMenu className='openbtn' onClick={clickButton}/>
        <h1 style={{fontSize: 50, margin: 20, color: 'white', display: 'inline'}}>GRU</h1>
        <p style={{fontSize: 20,margin: 20, color: 'white', display: 'inline'}}>Sistema de Gestion de Rendimiento Umano</p>
        <FaUserCircle size={35} style={{fill: 'white', float: 'right', margin: 20, display: 'inline'}}/>
        </div>
        <Routes>
            <Route path='panel' element={<Panel/>}/>
            <Route path='users' element={<Users/>}/>
        </Routes>
      </div>
    </div>
  );
};