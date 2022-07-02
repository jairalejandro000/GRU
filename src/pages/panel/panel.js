import React from 'react';
import './../../styles.css';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
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
    console.log(decodeURI(localStorage.getItem('token')))
    var state = false;
    const handleModal = () => ({
        state: true
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
            labels: 'Desempeño',
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
    const navigate = useNavigate();
    React.useEffect(() => {
        if (localStorage.getItem('token') == null) {
            navigate('/');
          }
    });
    return (
        <div className='app' style={{ width: "70%", height: "50%", marginTop: "10%" }}>
            <Bar data={data} options={options}/>
            <Button onClick={() => {handleModal()}}>Open modal</Button>
            <Modal show={state}>
            <Modal.Header>Prueba</Modal.Header>
            <Modal.Body>Prueba</Modal.Body>
            <Modal.Footer>Prueba</Modal.Footer>
            </Modal>
        </div>
    );
}