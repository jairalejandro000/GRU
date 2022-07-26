import React from 'react';
import { Route, Routes, NavLink } from 'react-router-dom';

import Panel from '../pages/panel/panel';
import Users from '../pages/panel/users';
import Module from '../pages/panel/modulo';

import { GiHamburgerMenu } from 'react-icons/gi';
import { BiHomeAlt } from 'react-icons/bi';
import { VscSignOut } from 'react-icons/vsc';

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

import './style.css';

export default class SideBar extends React.Component{
  //navigate = useNavigate();
  role = "";
  a = false;
  nav = false;
  state = {
    status: false,
    statusDisplay: false
  }
  async componentDidMount(){
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
  }
  closeNav = () => {
    this.nav = false;
    document.getElementById('mySidebar').style.width = '0';
    document.getElementById('main').style.marginLeft = '0';
  }
  openDialog = () => {
    this.setState({statusDisplay: true});
  }
  closeDialog = () => {
    this.setState({statusDisplay: false});
  }
  logOut = () => {
    try{
      //localStorage.clear();
      console.log("navigate");
      //this.props.history.push('/auth/login');
      this.navigate('/');
    }catch{
    }
  }
  ranking = () => {
    console.log("navigate")
    this.props.history.push("/login")
    //navigate('/panel/panel')
  }
  render(){
    return <div>
    {!this.state.status ? <></> : 
    <div>
      <div id='mySidebar' className='sidebar'>
        <button className='home' onClick={this.ranking}>
        <BiHomeAlt size={35}/>
        </button>
        {this.a ? <NavLink to='/panel/users'>Usuarios</NavLink> : null}
        {this.a ? <NavLink to='/auth/login'>Indicadores</NavLink> : null}
        {this.a ? <NavLink to='/panel/module'>Categorías</NavLink> : null}
      </div>
      <div id='main' className='main'>
        <div className='toolbar'>
              <GiHamburgerMenu className='openbtn' onClick={this.clickButton}/> 
              <h1 style={{fontSize: 70, margin: 20, color: 'white', display: 'inline'}}>GRU</h1>
              <p style={{fontSize: 30, marginBottom: 10, color: 'white', display: 'inline'}}>Sistema de Gestion de Rendimiento Umano</p>
            <div className='dropdown' style={{float: 'right', margin: 20, display: 'inline'}}>
                <VscSignOut size={35} onClick={this.openDialog} className='user dropbtn'/>
            </div>
          <div className="dialog-demo">
            <Dialog header="¿Seguro de cerrar sesión?" visible={this.state.statusDisplay} style={{ width: '50vw' }} onHide={this.closeDialog}>
              <Button label="Cerrar sesión" onClick={this.logOut} className="p-button-raised p-button-warning p-button-rounded"/>
              <Button label="Cancelar" onClick={this.closeDialog} className="p-button-raised p-button-danger p-button-rounded"/>
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
    </div> }
    </div> 
  }
}