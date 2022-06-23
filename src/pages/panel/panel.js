import React from "react";
//import {Navigate, useNavigate } from 'react-router-dom';
import "./../../styles.css";
//import minion from '../../assets/minion_home.jpg';
import { useNavigate } from 'react-router-dom';
import { useMemo } from "react";
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
} from "chart.js";
import { Bar } from "react-chartjs-2";
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
    const dataMinions = [
        { name: 'jair', points: 12 },
        { name: 'Adriana', points: 13 },
        { name: 'Capito', points: 11 },
        { name: 'Kappita', points: 16 },
        { name: 'Ferlozzzzz', points: 0 },
    ]
    const data = {
        labels: ['Jair', 'Adriana', 'Capito', 'Kappita', 'Ferlozzzz'],
        datasets: [{
            labels: 'Desempeño',
            backgroundColor: '#FFFFFF',
            hoverBackgroundColor: '#FBE940',
            data: [12, 13, 11, 16, 1]
        }]
    }
    const options = {
        fill: true,
        //animated: true,
        maintainAspectRation: true,
        responsive: true
    }
    const navigate = useNavigate();
    React.useEffect(() => {
        if (localStorage.getItem('token') == null) {
            navigate('/');
          }
    });
    return (
        <div className='app' style={{ width: "70%",height: "50%" }}>
          <Bar data={data} options={options}/>  
        </div>
    );
}