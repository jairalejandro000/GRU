import React from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { alertService } from '../../_services/alert.service';

import './../../styles.css';

export default function Sigup(){
    const navigate = useNavigate();
    const [values, setValues] = React.useState({
        name: "",
        email: "",
        password: "",
      });
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`http://165.227.181.97:80/api/auth/signup`, values)
          .then(res => {
            if(res.data.status === true && res.data.msg === "Hecho!"){
                navigate('/auth/login')
            }
            else {
                alertService.info('Algo ha salido mal',{ autoClose: false, keepAfterRouteChange: true });
            }
          })
    };
    function handleChange(evt) {
        const { target } = evt;
        const { name, value } = target;
        const newValues = {
          ...values,
          [name]: value,
        };
        setValues(newValues);
      }
    // JSX code for login form
    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Nombre</label>
                    <input type="text" name="username" onChange={handleChange} required/>
                </div>
                <div className="input-container">
                    <label>Correo electrónico</label>
                    <input type="email" name="email" onChange={handleChange} required/>
                </div>
                <div className="input-container">
                    <label>Contraseña</label>
                    <input type="password" name="password" onChange={handleChange} required/>
                </div>
                <div className="button-container">
                    <input type="submit" value="Registrarse"/>
                </div>
            </form>
        </div>
    );
    return (
        <div className="app">
            <div className="signup-form">
                <div className="title">REGISTRO</div>
                {renderForm}
                <p>¿Ya tienes cuenta? <a href="/auth/login">Inicia sesión ahora</a></p>
            </div>
        </div>
    );
}