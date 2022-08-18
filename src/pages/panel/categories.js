import React from 'react';
import axios from 'axios';
import { Grid } from 'react-loader-spinner';

import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';

import './styles.css';
export default class Categories extends React.Component{
  users = [];
  defatultState = {
    status: false,
    categories: null,
    category: null,
    statusDialog: false,
    statusDialogInfo: false
  }
  state = {
    status: false,
    categories: null,
    category: null,
    statusDialog: false,
    statusDialogInfo: false
  }
  edit = false;
  selectionChange(x){
    this.setState({category: x});
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
    this.setState({category: null});
  }
  deleteDialog = () =>{
    this.setState({statusDialogInfo: true});
  }
  async delete(){
    await axios.delete(`http://104.131.16.194/api/category/${this.state.category.id}`)
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
      ...this.state.category,
      [name]: value,
      is_decrement: false
    };
    this.setState({category: newValues});
  }
  submit = (edit) => {
    var is_decrement = false;
    var points = this.state.category.points;
    if(edit === true){
        axios.put(`http://104.131.16.194/api/category/${this.state.category.id}`, this.state.category)
        .then(res =>{
          this.afterSubmit();
        });
      }else{
        console.log(this.state);
        if(this.state.category.points < 0){
          is_decrement = true;
          points = points * -1;
        }else{
          is_decrement = false;
        }
        var c = this.state.category;
        c.is_decrement = is_decrement;
        c.points = points;
        this.setState({category: c})
        axios.post(`http://104.131.16.194/api/category`, this.state.category)
        .then(res =>{
          this.afterSubmit();
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
              this.setState(this.defatultState);
              this.categories.push(row)
          }
          this.setState({status: true, categories: this.categories});
          console.log(this.state);
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
          { this.state.category !== null ? <div> 
            <Button label='Nuevo registro' icon='pi pi-plus' className='p-button-success mr-2' onClick={() =>this.openDialog(false)}/>
            <Button label='Editar' icon='pi pi-pencil' className='p-button-warning mr-2' onClick={() =>this.openDialog(true)}/>
            <Button label='Eliminar' icon='pi pi-trash' className='p-button-danger mr-2' onClick={() => this.deleteDialog()}/> </div>
            : <Button label='Nuevo registro' icon='pi pi-plus' className='p-button-success mr-2' onClick={() =>this.openDialog(false)}/>
          }
          <DataTable value={this.categories} paginator rows={5}
            selection={this.state.category} onSelectionChange={(e) => this.selectionChange(e.value)}
            selectionMode='single' dataKey='id' responsiveLayout='scroll' 
            stateKey='dt-state-demo-session' emptyMessage='No se encontró ninguna categoría.'
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown">
            <Column field='name' header='Nombre' sortable></Column>
            <Column field='points' header='Puntos' sortable></Column>
          </DataTable>
        </div>
      }
      <Dialog header={<h4>{this.edit ? 'Editar' : 'Nuevo'} registro</h4>} visible={this.state.statusDialog} draggable={false} 
      resizable={false} style={{ width: '70vw' }} onHide={() => this.closeDialog(false)}>
        {this.edit ? 
        <div>
          <div className='input-container'>
              <label>Nombre</label>
              <InputText name='name' value={this.state.category !== null ? this.state.category.name : null}
              onChange={this.handleChange} required/>
          </div>
          <div className='input-container'>
              <label>Puntos</label>
              <InputNumber name='points' value={this.state.category !== null ? this.state.category.points : null}
               onValueChange={this.handleChange} min={-100} max={100} required/>
          </div>
          <div className='input-container'>
            <Button label='Actualizar registro' id='submitButton' onClick={() => this.submit(true)} className='p-button-warning mr-2'/>
          </div>
        </div> :
        <div>
          <div className='input-container'>
              <label>Nombre</label>
              <InputText name='name' onChange={this.handleChange} required/>
          </div>
          <div className='input-container'>
              <label>Puntos</label>
              <InputNumber name='points' onValueChange={this.handleChange} required/>
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

// <Column field='options' body={<BiDotsVerticalRounded/>} header='Opciones'></Column>