import React from 'react';
import axios from 'axios';
import { Grid } from 'react-loader-spinner';

import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

import './styles.css';
export default class Categories extends React.Component{
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
    console.log(newValues);
    this.setState({user: newValues});
  }

  submit = (edit) => {
    console.log(this.state);
    if(edit){
      axios.put(`http://104.131.16.194/api/user/${this.state.user.id}`, this.state.user)
      .then(res =>{
        console.log(this.state.user);
        console.log(res);
      });
    }
  }

    async componentDidMount() {
        axios.get('http://104.131.16.194/api/category/')
        .then(res =>{
            this.categories = [];
            for(let e of res.data.data){
                const row = {
                    id: e.id,
                    name: e.name,
                    points: e.points
                }
                this.categories.push(row)
            }
            this.setState({status: true, categories: this.categories})
        });
        if(localStorage.getItem('token') == null || atob(localStorage.getItem('user')) === 'minion') {
            console.log("ya valiste padrino")
        }
    }
    
    render(){
        return <div className='container'>
            {!this.state.status || this.state.categories ==  null ? 
            <div className='loading'>
            <Grid
              height = '100'
              width = '110'
              color = '#FBE940'
            />
          </div> :
          <div>
            { this.state.user !== null ? <div> 
              <Button label='Nuevo registro' icon='pi pi-plus' className='p-button-success mr-2' onClick={() =>this.openDialog(false)}/>
              <Button label='Editar' icon='pi pi-pencil' className='p-button-warning mr-2' onClick={() =>this.openDialog(true)}/>
              <Button label='Eliminar' icon='pi pi-trash' className='p-button-danger mr-2' onClick={() => this.deleteDialog()}/> </div>
              : <Button label='Nuevo registro' icon='pi pi-plus' className='p-button-success mr-2' onClick={() =>this.openDialog(false)}/>
            }
            <DataTable value={this.categories} paginator rows={10} selectionMode="single" dataKey="id" 
              selection={this.state.user} onSelectionChange={(e) => this.selectionChange(e.value)} 
              responsiveLayout="scroll" stateKey="dt-state-demo-session" emptyMessage="No customers found.">
              <Column field='name' header='Nombre' sortable></Column>
              <Column field='points' header='Puntos' sortable></Column>
              
            </DataTable>
          </div>
        }
        </div>
    }

}

// <Column field='options' body={<BiDotsVerticalRounded/>} header='Opciones'></Column>