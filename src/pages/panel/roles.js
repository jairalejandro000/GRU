import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { Grid } from 'react-loader-spinner';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import './styles.css';
class RolesIndex extends React.Component{
    roles = [];
    state = {
        status: false,
        roles: null
    }
    async componentDidMount(){
        await axios.get('http://104.131.16.194/api/role/')
        .then(res => {
            this.roles = [];
            this.setState(this.defatultState);
            for(let e of res.data.data){
                e.name = e.name.charAt(0).toUpperCase() + e.name.slice(1);
                this.roles.push(e);
            }
            console.log(this.roles);
            this.setState({status: true, roles: this.roles});
        });
      }
    render(){
        return <div className='container'>
            {!this.state.status || this.state.roles === null ?
            <div className='loading'>
            <Grid
              height = '100'
              width = '110'
              color = '#FBE940'
            />
          </div> : 
            <DataTable value={this.roles} paginator rows={5}
                dataKey='id' responsiveLayout='scroll' stateKey='dt-state-demo-session' 
                emptyMessage='No se encontró ningún rol.' paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown">
                <Column field='name' header='Rol' sortable></Column>
            </DataTable>
            }</div>
        
    }
}
export default function Roles(){
    const navigate = useNavigate();
    React.useEffect(() =>{
        if(localStorage.getItem('token') === null || atob(localStorage.getItem('user')) === 'minion') {
        navigate('/auth/login');
        }
    });
    return(
        <RolesIndex/>
    );

}