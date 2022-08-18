import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { Grid } from 'react-loader-spinner';

import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

import './styles.css';
class UsersIndex extends React.Component{
  users = [];
  roles = [
    { id: 1, name: 'Minion' },
    { id: 2, name: 'Nefario' },
    { id: 3, name: 'Gru' }
  ];
  defatultState = {
    status: false,
    users: null,
    user: null,
    statusDialog: false,
    statusDialogInfo: false
  }
  state = {
    status: false,
    users: null,
    user: null,
    statusDialog: false,
    statusDialogInfo: false
  }
  edit = false;
  isNefario = false;
  isGru = false;
  async componentDidMount(){
    await axios.get('http://104.131.16.194/api/user/')
    .then(res => {
        this.users = [];
        this.setState(this.defatultState);
        for(let e of res.data.data){
          const row = {
            id: e.id,
            name: e.name,
            email: e.email,
            role_name: this.roles[e.role.id - 1].name,
            role_id: e.role.id
          }
          this.users.push(row);
        }
        this.setState({status: true, users: this.users});
        console.log(this.state);
    });
    if(atob(localStorage.getItem('user')) === 'nefario'){
      //permiso para actualizar menos el rol
      this.isNefario = true;
    }
    if(atob(localStorage.getItem('user')) === 'gru'){
      //permiso para hacer de todo
      this.isGru = true;
    }
  }
  selectionChange(x){
    this.setState({user: x});
  }
  openDialog = (edit) =>{
    if(edit === true){
      this.edit = true;
      this.setState({statusDialog: true});
    }else{
      this.edit = false;
      this.setState({statusDialog: true, user: null});
    }
  }
  closeDialog = (info) =>{
    if(info === true){
      this.setState({statusDialogInfo: false});
    }else{
      this.setState({statusDialog: false});
    }
    this.setState({user: null});
  }
  deleteDialog = () =>{
    this.setState({statusDialogInfo: true});
  }
  async delete(){
    await axios.delete(`http://104.131.16.194/api/user/${this.state.user.id}`)
    .then(res => {
      this.afterSubmit();
    });
  }
  afterSubmit = () =>{
    this.closeDialog(true);
    this.closeDialog(false);
    this.componentDidMount();
  }
  handleChange = (evt) => {
    const { target } = evt;
    const { name, value } = target;
    const newValues = {
      ...this.state.user,
      [name]: value
    };
    if(name === 'role_id'){
      newValues.role_id = value.id;
    }
    this.setState({user: newValues});
    /*if (cansubmit) {
        document.getElementById('submitbutton').disabled = false;
    }*/
  }
  async submit(edit) {
    if(edit){
      await axios.put(`http://104.131.16.194/api/user/${this.state.user.id}`, this.state.user)
      .then(res =>{
        console.log(res)
      });
    }else{
      await axios.post(`http://104.131.16.194/api/user/`, this.state.user)
      .then(res =>{
        console.log(res)
      });
    }
    await this.afterSubmit()

  }
  render(){
    return <div className='container'>
      {!this.state.status || this.state.users == null ? 
      <div className='loading'>
        <Grid
          height = '100'
          width = '110'
          color = '#FBE940'
        />
      </div> :
      <div>
        {this.state.user !== null ? <div> 
          <Button label='Nuevo registro' icon='pi pi-plus' className='p-button-success mr-2' onClick={() =>this.openDialog(false)}/>
          <Button label='Editar' icon='pi pi-pencil' className='p-button-warning mr-2' onClick={() =>this.openDialog(true)}/>
          <Button label='Eliminar' icon='pi pi-trash' className='p-button-danger mr-2' onClick={() => this.deleteDialog()}/> </div>
          : <Button label='Nuevo registro' icon='pi pi-plus' className='p-button-success mr-2' onClick={() =>this.openDialog(false)}/>
        }
        <DataTable value={this.users} paginator rows={5}
            selection={this.state.user} onSelectionChange={(e) => this.selectionChange(e.value)}
            selectionMode='single' dataKey='id' responsiveLayout='scroll' 
            stateKey='dt-state-demo-session' emptyMessage='No se encontró ningún usuario.'
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown">
            <Column field='name' header='Usuario' sortable></Column>
            <Column field='email' header='Correo electrónico' sortable></Column>
            <Column field='role_name' header='Rol' sortable></Column>
        </DataTable>
      </div>
      }
      <Dialog header={<h4>{this.edit ? 'Editar' : 'Nuevo'} registro</h4>} visible={this.state.statusDialog} draggable={false} 
      resizable={false} style={{ width: '70vw' }} onHide={() => this.closeDialog(false)}>
        {this.edit ? 
        <div>
          <div className='input-container'>
              <label>Usuario</label>
              <InputText name='name' value={this.state.user !== null ? this.state.user.name : null}
              onChange={this.handleChange} required/>
          </div>
          <div className='input-container'>
              <label>Correo electrónico</label>
              <InputText name='email' value={this.state.user !== null ? this.state.user.email : null}
              onChange={this.handleChange} required/>
          </div>
          <div className='input-container'>
              <label>Rol</label>
              <Dropdown name='role_id' value={this.state.user !== null ? this.roles[this.state.user.role_id - 1] : null} 
              options={this.roles} onChange={this.handleChange} optionLabel="name" />
          </div>
          <div className='input-container'>
            <Button label='Actualizar registro' id='submitButton' onClick={() => this.submit(true)} className='p-button-warning mr-2'/>
          </div>
        </div> :
        <div>
          <div className='input-container'>
              <label>Usuario</label>
              <InputText name='name' onChange={this.handleChange} required/>
          </div>
          <div className='input-container'>
              <label>Correo electrónico</label>
              <InputText name='email' onChange={this.handleChange} required/>
          </div>
          <div className='input-container'>
              <label>Password</label>
          {this.isNefario === true ? 
          <InputText name='password' onChange={this.handleChange} readOnly/>
          :
          <InputText name='password' onChange={this.handleChange} required/>
          }
          </div>
          <div className='input-container'>
              <label>Rol</label>
              <InputText placeholder='Minion' disabled/>
          </div>
          <div className='input-container'>
            <Button label='Añadir registro' id='submitButton' onClick={() => this.submit(false)} className='p-button-warning mr-2'/>
          </div>
        </div> }
      </Dialog>
      <Dialog header={<h4>¿Seguro de eliminar el registro?</h4>} visible={this.state.statusDialogInfo} draggable={false} 
      resizable={false} style={{ width: '70vw' }} onHide={() => this.closeDialog(true)}>
        <Button label='Cancelar' icon='pi pi-times-circle' className='p-button-danger mr-2' onClick={() => this.closeDialog(true)}/>
        <Button label='Eliminar' icon='pi pi-check' className='p-button-success mr-2' onClick={() => this.delete()}/>
      </Dialog>
    </div>
  }
}
export default function Users(){
  const navigate = useNavigate();
  React.useEffect(() =>{
    if(localStorage.getItem('token') === null || atob(localStorage.getItem('user')) === 'minion') {
      navigate('/auth/login');
    }
  });
  return(
    <UsersIndex/>
  );

}