import React, { useState } from "react";
import {Navigate, useNavigate} from 'react-router-dom';
import axios from 'axios';

import './../../styles.css';

export default function Sigup(){
    const navigate = useNavigate();
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const database = [
        {
            username: 'jairalejandro32@outlook.com',
            password: "12ab34cd"
        },
        {
            username: '19170146@uttcampus.edu.mx',
            password: 'canalitoscanalitos'
        }
    ];
    const errors = {
        uname: "invalid username",
        pass: "invalid password"
    };
    const [values, setValues] = React.useState({
        name: "",
        email: "",
        password: "",
      });
    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();
        //var { uname, pass } = document.forms[0];
        // Find user login info
        // const userData = database.find((user) => user.username === uname.value);
        // Compare user info
        // if (userData) {
            // if (userData.password !== pass.value) {
                // Invalid password
                //setErrorMessages({ name: "pass", message: errors.pass });
            // }else {
                //setIsSubmitted(true);
            //}
        //}else {
            // Username not found
            //setErrorMessages({ name: "uname", message: errors.uname });
        //}
        axios.post(`http://127.0.0.1:8000/api/auth/signup`, values)
          .then(res => {
            console.log(res);
            if(res.data.status === true && res.data.msg === "Hecho!"){
                navigate('/panel/panel')
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
    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
        <div className="error">{errorMessages.message}</div>
        );
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
                {isSubmitted ? <Navigate to="/" /> : renderForm}
                <p>¿Ya tienes cuenta? <a href="/auth/login">Inicia sesión ahora</a></p>
            </div>
        </div>
    );
}