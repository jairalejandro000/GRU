import React, { useState } from "react";
import {Navigate, useNavigate } from 'react-router-dom';

import "./../../styles.css";


export default function Login(){
    const navigate = useNavigate();
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    // User Login info
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
    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();
        var { uname, pass } = document.forms[0];
        // Find user login info
        const userData = database.find((user) => user.username === uname.value);
        // Compare user info
        if (userData) {
            if (userData.password !== pass.value) {
                // Invalid password
                setErrorMessages({ name: "pass", message: errors.pass });
            }else {
                setIsSubmitted(true);
            }
        }else {
            // Username not found
            setIsSubmitted(true)
            setErrorMessages({ name: "uname", message: errors.uname });
        }
    };
    // Generate JSX code for error message
    const renderErrorMessage = (name) => name === errorMessages.name && (
        <div className="error">{errorMessages.message}</div>
    );
    // JSX code for login form
    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Username </label>
                    <input type="text" name="uname" required />
                    {renderErrorMessage("uname")}
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password" name="pass" required />
                    {renderErrorMessage("pass")}
                </div>
                <div className="button-container">
                    <input type="submit" value="Iniciar sesión"/>
                </div>
            </form>
        </div>
    );
    return (
        <div className="app">
            <div className="login-form">
                <div className="title">INICIO DE SESIÓN</div>
                {isSubmitted ? <Navigate to="/panel/panel"/> : renderForm}
                <br/>
                <p onClick={() => navigate.push('/')}>¿No tienes cuenta Regístrate ahora?</p>
            </div>
        </div>
    );
}