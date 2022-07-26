import React from 'react';
import './../../styles.css';
import { useNavigate } from 'react-router-dom';
import {
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
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    //LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );

export default function Panel(){
    console.log(decodeURI(localStorage.getItem('token')))
    const navigate = useNavigate();
    React.useEffect(() => {
        if (localStorage.getItem('token') == null) {
            navigate('/');
          }
    });
    /*var a = auth;
    console.log(a.authenticated.version);
    console.log(a.authenticated.value);
    const dataMinions = [
        { name: 'jair', points: 12 },
        { name: 'Adriana', points: 13 },
        { name: 'Capito', points: 11 },
        { name: 'Kappita', points: 16 },
        { name: 'Ferlozzzzz', points: 0 },
    ]*/
    const data = {
        labels: ['Jair', 'Adriana', 'Capito', 'Kappita', 'Ferlozzzz'],
        datasets: [{
            label: 'Desempeño',
            hoverBackgroundColor: '#FFFFFF',
            backgroundColor: '#FBE940',
            data: [12, 13, 11, 16, 1]
        }]
    }
    const options = {
        fill: true,
        maintainAspectRation: true,
        responsive: true
    }
    return (
        <div className='container'>
            <Bar 
            data={data} 
            options={options}
            />
        </div>
    );
}