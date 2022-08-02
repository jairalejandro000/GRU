import React from 'react';
import axios from 'axios';

import { Grid } from 'react-loader-spinner';

import { BiDotsVerticalRounded } from 'react-icons/bi';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import './styles.css';
export default class Categories extends React.Component{
    categories = [];
    state = {
      status: false,
      categories: null,
      selectedCategory: null
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
          <DataTable value={this.categories} paginator rows={10} selectionMode="single" dataKey="id" 
            responsiveLayout="scroll" stateKey="dt-state-demo-session" emptyMessage="No customers found.">
            <Column field='name' header='Nombre' sortable></Column>
            <Column field='points' header='Puntos' sortable></Column>
            <Column field='options' body={<BiDotsVerticalRounded/>} header='Opciones'></Column>
        </DataTable>
        }
        </div>
    }

}