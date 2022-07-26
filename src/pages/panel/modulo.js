import React from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
export default class Modulo extends React.Component{
  example = "a";
  users = [];
  roles = [
    { id: 1, name: 'Minion' },
    { id: 2, name: 'Nefario' },
    { id: 3, name: 'Gru' }
  ];
  state = {
    loading: true,
    users: null
  };
  async componentDidMount(){
    this.example = await "prueba";
    await axios.get('http://104.131.16.194/api/user/')
    .then(res => {
        this.users = [];
        for(let e of res.data.data){
          const user = {
            id: e.id,
            name: e.name,
            email: e.email,
            role_name: this.roles[e.role.id - 1].name
          }
          this.users.push(user);
        }
      });
      console.log(this.users);
    this.setState({loading: false, users: this.users});
  }
  render() {
    return <div>
      <h1>{this.state.loading || this.state.users == null ? "No se ha cargado esta basura": 
      <div className="card">
      <DataTable value={this.users} responsiveLayout="scroll">
          <Column field="name" header="Usuario"></Column>
          <Column field="email" header="Correo electrónico"></Column>
          <Column field="role_name" header="Rol"></Column>
      </DataTable>
    </div>}</h1>
    </div>
  }
}