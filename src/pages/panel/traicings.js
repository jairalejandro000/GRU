import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { Grid } from 'react-loader-spinner';

import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';

import './styles.css';
class TraicingsIndex extends React.Component{
    users = [];
    categories = [];
    defatultState = {
        state: false,
        users: null,
        usersSelected: null,
        statusDialog: false,
        categories: null,
        stateCategory: false,
        categorySelected: null
    }
    state = {
        state: false,
        users: null,
        usersSelected: null,
        statusDialog: false,
        categories: null,
        stateCategory: false,
        categorySelected: null
     }
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
                role_name: e.role.name.charAt(0).toUpperCase() + e.role.name.slice(1),
                role_id: e.role.id
              }
              this.users.push(row);
            }
            this.setState({status: true, users: this.users});
            console.log(this.state);
        });
    }
    openDialog = () =>{
        this.setState({statusDialog: true});
        this.getCategories();   
    }
    closeDialog = () =>{
    this.setState({statusDialog: false, usersSelected: null});
    }
    async getCategories(){
        await axios.get('http://104.131.16.194/api/category/')
        .then(res => {
            this.categories = [];
            for(let e of res.data.data){
              const row = {
                id: e.id,
                name: e.name,
                points: e.points,
                string: `${e.name} (${e.points})`
              }
              this.categories.push(row);
            }
            console.log(this.categories)
            this.setState({statusCategory: true, categories: this.categories});
            console.log(this.state);
        });
    }
    handleChange = (evt) => {
        const { target } = evt;
        const { value } = target;
        this.setState({categorySelected: value});
        console.log(this.state.categorySelected)
    }
    async submit(){
        for(let x of this.state.usersSelected){
            var traicing = {
                user_id: x.id,
                category_id: this.state.categorySelected.id,
                description: "A"
            }
            await axios.post('http://104.131.16.194/api/tracings/', traicing)
            .then(res => {
            this.componentDidMount();
        });
        }
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
            {this.state.usersSelected !== null ? 
                <Button label='Seguimiento' icon='pi pi-plus' className='p-button-success mr-2' onClick={() => this.openDialog(false)}/> : 
            null }
            <DataTable value={this.users} selection={this.state.usersSelected} onSelectionChange={e => this.setState({usersSelected: e.value})}
                dataKey="id" responsiveLayout="scroll" paginator rows={5} stateKey='dt-state-demo-session' emptyMessage='No se encontró ningún usuario.'
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown">
                <Column selectionMode="multiple" headerStyle={{width: '3em'}}></Column>
                <Column field='name' header='Usuario' sortable></Column>
                <Column field='email' header='Correo electrónico' sortable></Column>
                <Column field='role_name' header='Rol' sortable></Column>
            </DataTable>
        </div>
        }
        <Dialog header={<h4>Seguimiento usuarios</h4>} visible={this.state.statusDialog} draggable={false} 
        resizable={false} style={{ width: '70vw' }} onHide={() => this.closeDialog(false)}>
            {!this.state.statusCategory || this.state.categories == null ?
            <div className='loading'>
            <Grid
                height = '50'
                width = '55'
                color = '#FBE940'
            />
            </div> : 
            <div>
                <div className='input-container'>
                    <Dropdown name='category' placeholder="Selecciona una categoría" options={this.categories} 
                    onChange={this.handleChange} optionLabel="string" value={this.state.categorySelected !== null 
                    ? this.state.categorySelected : null} />
                </div>
                <Button label='Cancelar' icon='pi pi-times-circle' className='p-button-danger mr-2' 
                onClick={() => this.closeDialog(true)}/>
                <Button label='Añadir' icon='pi pi-check' className='p-button-success mr-2' 
                onClick={() => this.submit()}/>
            </div>
            }
        </Dialog>
        </div>
    }
}
export default function Traicings(){
    const navigate = useNavigate();
    React.useEffect(() =>{
        if(localStorage.getItem('token') === null || atob(localStorage.getItem('user')) === 'minion') {
        navigate('/auth/login');
        }
    });
    return(
        <TraicingsIndex/>
    );
}