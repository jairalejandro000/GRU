import React, { useState } from 'react';
import { Route, Routes, NavLink, useNavigate } from 'react-router-dom';

import Panel from '../pages/panel/panel';
import Users from '../pages/panel/users';
import Module from '../pages/panel/modulo';

import { GiHamburgerMenu } from 'react-icons/gi';
import { BiHomeAlt } from 'react-icons/bi';
import { VscSignOut } from 'react-icons/vsc';

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

import { Toolbar } from 'primereact/toolbar';

import './style.css';

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
    document.getElementById('main').style.marginLeft = '0';
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
  const [displayBasic, setDisplayBasic] = useState(false);
  const dialogFuncMap = {
    'displayBasic': setDisplayBasic
  }
  const [position, setPosition] = useState('center');
  const onClick = (name, position) => {
      dialogFuncMap[`${name}`](true);
      if (position) {
          setPosition(position);
      }
  }
  const onHide = (name) => {
      dialogFuncMap[`${name}`](false);
  }
  const renderFooter = (name) => {
    return (
        <div>
            <Button label="No" icon="pi pi-times" onClick={() => onHide(name)} className="p-button-text" />
            <Button label="Yes" icon="pi pi-check" onClick={() => onHide(name)} autoFocus />
        </div>
    );
}
  const logOut = () => {
    try{

      localStorage.clear();
      navigate('/');
    }catch{

    }
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
        {a ? <NavLink to='/panel/module'>Categorías</NavLink> : null}
      </div>
      <div id='main' className='main'>
        <div className='toolbar'>
       
              <GiHamburgerMenu className='openbtn' onClick={clickButton}/>
              <h1 style={{fontSize: 50, margin: 20, color: 'white', display: 'inline'}}>GRU</h1>
              <p style={{fontSize: 20,margin: 20, color: 'white', display: 'inline'}}>Sistema de Gestion de Rendimiento Umano</p>
       
            <div className='dropdown' style={{float: 'right', margin: 20, display: 'inline'}}>
                <VscSignOut size={35} onClick={() => onClick('displayBasic')} className='user dropbtn'/>
            </div>
          <div className="dialog-demo">
            <Dialog header="¿Seguro de cerrar sesión?" visible={displayBasic} style={{ width: '50vw' }} onHide={() => onHide('displayBasic')}>
              <Button label="Cerrar sesión" onClick={logOut} className="p-button-raised p-button-warning p-button-rounded"/>
              <Button label="Cancelar" onClick={() => onHide('displayBasic')} className="p-button-raised p-button-danger p-button-rounded"/>
            </Dialog>
          </div>
        </div>
          <Routes>
              <Route path='panel' element={<Panel/>}/>
              <Route path='users' element={<Users/>}/>
              <Route path='module' element={<Module/>}/>
              <Route path='*' element={<Panel/>}/>
          </Routes>
      </div>
    </div>
  );
};