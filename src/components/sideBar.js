import React from 'react';
import { Route, Routes, NavLink, useNavigate } from 'react-router-dom';

import Panel from '../pages/panel/panel';
import Users from '../pages/panel/users';
import Roles from '../pages/panel/roles';
import Module from '../pages/panel/modulo';
import Categories from '../pages/panel/categories';
import Traicings from '../pages/panel/traicings';

import { RiMenu5Fill } from 'react-icons/ri';
import { BiHomeAlt } from 'react-icons/bi';
import { VscSignOut } from 'react-icons/vsc';


import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

import './style.css';

export function N(path){
  const navigate = useNavigate()
  navigate('/home')
}

export default class SideBar extends React.Component{
  role = "";
  a = false;
  nav = false;
  state = {
    status: false,
    statusDisplay: false
  }
  async componentDidMount(){
    console.log(decodeURI(localStorage.getItem('token')))
    this.role = await atob(localStorage.getItem('user'));
    if(this.role === 'minion'){
      this.a = await false;
    }else{
      this.a = await true;
    }
    this.setState({status: true});
  }
  clickButton = () => {
    if(this.nav === false){
      this.openNav()
    }else{
      this.closeNav()
    }
  }
  openNav = () => {
    this.nav = true;
    document.getElementById('mySidebar').style.width = '220px';
    document.getElementById('main').style.marginLeft = '220px';
    document.getElementById('burguer').style.display = 'none';
    document.getElementById('closebtn').style.display = 'inline';
  }
  closeNav = () => {
    this.nav = false;
    document.getElementById('mySidebar').style.width = '0px';
    document.getElementById('main').style.marginLeft = '0px';
    document.getElementById('burguer').style.display = 'inline';
    document.getElementById('closebtn').style.display = 'none';
  }
  openDialog = () => {
    this.setState({statusDisplay: true});
  }
  closeDialog = () => {
    this.setState({statusDisplay: false});
  }
  logOut = () => {
    localStorage.clear();
    window.location.reload(true)
  }
  ranking = () => {
    window.location.replace('http://localhost:3000/panel/panel');
  }
  render(){
    return <div>
    {!this.state.status ? <></> : 
    <div>
      <div id='mySidebar' className='sidebar'>
        <BiHomeAlt className='home' onClick={this.ranking} size={35}/>
        <RiMenu5Fill id='closebtn' className='closebtn' size={35} onClick={this.clickButton}/> 
        <div style={{marginTop: '25px'}}>
          {this.a ? <NavLink to='/panel/roles'>Roles</NavLink> : null}
          {this.a ? <NavLink to='/panel/users'>Usuarios</NavLink> : null}
          {this.a ? <NavLink to='/panel/traicings'>Seguimientos</NavLink> : null}
          {this.a ? <NavLink to='/panel/categories'>Categorías</NavLink> : null}
        </div>
      </div>
      <div id='main' className='main'>
        <div className='toolbar'>
              <RiMenu5Fill id='burguer' className='openbtn' onClick={this.clickButton}/>
              <h1 style={{fontSize: 70, margin: 20, color: 'white', display: 'inline'}}>GRU</h1>
              <p style={{fontSize: 30, marginBottom: 10, color: 'white', display: 'inline'}}>Sistema de Gestion de Rendimiento Umano</p>
            <div className='dropdown' style={{float: 'right', margin: 20, display: 'inline'}}>
                <VscSignOut size={35} onClick={this.openDialog} className='user dropbtn'/>
            </div>
          <div className="dialog-demo">
            <Dialog header="¿Seguro de cerrar sesión?" visible={this.state.statusDisplay} draggable={false} resizable={false} style={{ width: '50vw' }} onHide={this.closeDialog}>
              <Button label="Cerrar sesión" onClick={this.logOut} className="p-button-raised p-button-warning p-button-rounded"/>
              <Button label="Cancelar" onClick={this.closeDialog} className="p-button-raised p-button-danger p-button-rounded"/>
            </Dialog>
          </div>
        </div>
      </div>
      <Routes>
          <Route path='panel' element={<Panel/>}/>
          <Route path='roles' element={<Roles/>}/>
          <Route path='users' element={<Users/>}/>
          <Route path='module' element={<Module/>}/>
          <Route path='categories' element={<Categories/>}/>  
          <Route path='traicings' element={<Traicings/>}/>
          <Route path='*' element={<Panel/>}/>
      </Routes>
    </div> }
  </div> 
  }
}