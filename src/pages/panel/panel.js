import React from 'react';
//import { useNavigate } from 'react-router-dom';
/*import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  //LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';*/
//import { Bar } from 'react-chartjs-2';
import { Dialog } from 'primereact/dialog';
import { Image } from 'primereact/image';
//import { Button } from 'primereact/button';

import { Grid } from 'react-loader-spinner';
import './styles.css';
import './../../styles.css';
import { Chart } from 'primereact/chart';
import m from '../../assets/minion_feo.png';
/*ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    //LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );*/
export default class Panel extends React.Component{
    //const navigate = useNavigate();
    state = {
        status: false,
        statusDisplay: false
    }
    user = "Jair"
    async componentDidMount(){
        if(localStorage.getItem('token') === null){
            //Navigate
        }
        await this.setState({status: true})
    }
    basicData = {
        labels: ['Jair', 'Adriana', 'Capito', 'Kappita', 'Ferlozzzz'],
        datasets: [
            {
                label: 'Desempaño',
                borderColor: '#42A5F5',
                hoverBackgroundColor: '#FFFFFF',
                backgroundColor: '#FBE940',
                data: [12, 13, 11, 16, 1],
                tension: .4
            },
        ]
    };
    /*data = {
        labels: ['Jair', 'Adriana', 'Capito', 'Kappita', 'Ferlozzzz'],
        datasets: [{
            label: 'Desempeño',
            hoverBackgroundColor: '#FFFFFF',
            backgroundColor: '#FBE940',
            data: [12, 13, 11, 16, 1]
        }]
    }*/
    handleClick = () => {
        if(this.state.statusDisplay === false){
            this.openDialog()
        }
        //funciton to open modal
    }
    openDialog = () => {
        this.setState({statusDisplay: true});

    }
    closeDialog= () => {
        this.setState({statusDisplay: false});
    }
    /*options = {
        fill: true,
        maintainAspectRation: true,
        responsive: true,
        <Bar style={{color: 'white'}} 
                    data={this.data} 
                    options={this.options}
                    onClick={this.handleClick}
                    />
    }*/
    basicOptions = {
        fill: true,
        maintainAspectRation: true,
        responsive: true,
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
                    color: '#ebedef'
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
                    options={this.basicOptions}
                    onClick={this.handleClick}/>
                </div>
            }
            <Dialog header={<h4>Desempeño del usuario: {this.user}</h4> } visible={this.state.statusDisplay} 
            draggable={false} resizable={false} style={{ width: '70vw' }} onHide={this.closeDialog}>
                <div className='parent' style={{ backgroundColor: 'black'}}>
                    <Image src={m} width='100px' preview />
                </div>
                <div className='child'>
                    <Chart type='line'
                    data={this.basicData} 
                    options={this.basicOptions2}
                    onClick={this.handleClick}/>
                </div>
            </Dialog>
            </div>

    }
}