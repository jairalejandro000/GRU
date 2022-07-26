import React from 'react';
import axios from 'axios';
import { Grid } from 'react-loader-spinner';
  //Audio,
  //BallTriangle,
  //Bars,
  //Circles,
  //Grid,
  //Hearts,
  //MutatingDots,
  //Oval,
  //Plane,
  //RevolvingDot,
  //Rings,
  //TailSpin,
  //Triangle,
  //Watch

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import './styles.css';
export default class Users extends React.Component{
  users = [];
  roles = [
    { id: 1, name: 'Minion' },
    { id: 2, name: 'Nefario' },
    { id: 3, name: 'Gru' }
  ];
  state = {
    status: false,
    users: null
  }
  async componentDidMount(){
    await axios.get('http://104.131.16.194/api/user/')
    .then(res => {
        this.users = [];
        for(let e of res.data.data){
          const row = {
            id: e.id,
            name: e.name,
            email: e.email,
            role_name: this.roles[e.role.id - 1].name
          }
          this.users.push(row);
        }
        this.setState({status: true, users: this.users});
    });
    if(localStorage.getItem('token') == null || atob(localStorage.getItem('user')) !== 'gru') {
        console.log("ya valiste padrino")
    }
  }
  render(){
    return <div className='container'>
      {!this.state.status || this.state.users == null ? 
      <Grid
        height = '100'
        width = '110'
        color = '#FBE940'
      /> :
      <DataTable value={this.users} responsiveLayout="scroll">
        <Column field="name" header="Usuario"></Column>
        <Column field="email" header="Correo electrónico"></Column>
        <Column field="role_name" header="Rol"></Column>
      </DataTable>}
      </div>
  }
}