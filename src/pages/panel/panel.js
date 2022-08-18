import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { Grid } from 'react-loader-spinner';

import { Dialog } from 'primereact/dialog';
import { Chart } from 'primereact/chart';

import './styles.css';
import './../../styles.css';
class PanelChart extends React.Component{
    users = [];
    points = [];
    data = [];
    months = ['Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'];
    userSelected = null;
    defatultState = {
      status: false,
      statusDisplay: false,
    }
    state = {
        status: false,
        statusDisplay: false,
    }
    basicData = null;
    basicData2 = null;
    async componentDidMount(){
        await axios.get('http://104.131.16.194/api/histories/')
        .then(res => {
            this.users = [];
            this.points = [];
            this.data = [];
            this.setState(this.defatultState);
            for(let x of res.data.data){
                this.users.push(x.user.name);
                this.data.push(x);
                var total = 0;
                for(let z of x.tracings){
                    total += z.points;
                }
                this.points.push(total.toString())
            }
            this.basicData = {
                labels: this.users,
                datasets: [
                    {
                        label: 'Desempeño',
                        borderColor: '#42A5F5',
                        hoverBackgroundColor: '#FFFFFF',
                        backgroundColor: '#FBE940',
                        data: this.points,
                        tension: .4
                    },
                ]
            };
        });
        this.setState({status: true})
    }
    handleClick = (e) =>{
        this.userSelected = e[0];
        this.openDialog();
        console.log(this.userSelected);
        var a = [];
        var b = [];
        for(let x of this.data[this.userSelected.index].tracings){
            var date = new Date(x.created_at)
            var finalDate = (`${date.getDate()} de ${this.months[date.getMonth()]} del ${date.getFullYear()}`)
            b.push(finalDate)
            a.push(x.points)
        }
        this.basicData2 = {
            labels: b,
            datasets: [
                {
                    label: 'Historial de desempeño',
                    borderColor: '#002aa1',
                    hoverBackgroundColor: 'black',
                    backgroundColor: '#002aa1',
                    data: a,
                    tension: .4
                }
            ]
        };
    }
    openDialog = () => {
        this.setState({statusDisplay: true});

    }
    closeDialog = () =>{
        this.setState({statusDisplay: false});
    }
    basicOptions = {
        fill: true,
        maintainAspectRation: true,
        responsive: true,
        onClick: (e, elements) => {
            this.handleClick(elements);
          },
        plugins: {
            legend: {
                labels: {
                    color: 'white'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: 'white'
                },
                grid: {
                    color: 'transparent'
                }
            },
            y: {
                ticks: {
                    color: 'white'
                },
                grid: {
                    color: 'transparent'
                }
            }
        }
    };
    basicOptions2 = {
        maintainAspectRatio: false,
        aspectRatio: .6,
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#FFFFFF'
                }
            },
            y: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            }
        }
    };
    render(){
        return <div className='container'>
            {!this.state.status ? 
                <div className='loading'>
                    <Grid
                        height = '100'
                        width = '110'
                        color = '#FBE940'
                    />
                </div> :
                <div className='container'>
                    <Chart type='bar' 
                    data={this.basicData} 
                    options={this.basicOptions}/>
                </div>
            }
            <Dialog header={<h4>Historial del usuario: {this.userSelected !== null ? this.users[this.userSelected.index] + ' Correo electrónico: ' + this.data[this.userSelected.index].user.email : 'Error en el nombre'}</h4> } 
            visible={this.state.statusDisplay} 
            draggable={false} resizable={false} style={{ width: '70vw' }} onHide={() => this.closeDialog()}>
                <Chart type='line'
                data={this.basicData2} 
                options={this.basicOptions2}/>
            </Dialog>
            </div>

    }
}
export default function Panel(){
    const navigate = useNavigate();
    React.useEffect(() =>{
        if(localStorage.getItem('token') === null) {
        navigate('/auth/login');
        }
    });
    return(
        <PanelChart/>
    )
}